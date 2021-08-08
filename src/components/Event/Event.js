import { useState, React } from 'react'
import ReactModal from 'react-modal'
import Group from '../Group/Group'
import './Event.css'

import { savePick } from '../../services/picks'


export default function Event(props) {

    const [ propositions, setPropositions ] = useState(props.propositions)
    const [ isSaved, setIsSaved ] = useState(true)
    const [ shouldShowModal, setShouldShowModal ] = useState(false)
    const [ modalContentLabel, setModalContentLabel ] = useState('') 
    const [ modalContentElement, setModalContentElement] = useState(<> </>)

    const userId = props.userId
    const eventStart = props.event.start
    const eventId = props.event.id
    const [eventYear, eventWeek] = eventId.split('-')

    const maxUnits = props.event.maxUnits

    const requiredGames = propositions.filter( p => p.group.name === 'required')
    const optionalGames = propositions.filter( p => p.group.name === 'optional')

    const deadLine = setDeadLine(eventStart, eventYear, eventWeek)
    
    const sumTotalUnits = () => {
        const units = propositions.map( (p) => {
            return Number(p.pick.units)
        })
        return units.reduce( (sum, value) => {
            return sum + value
        })
    }    
    const totalUnits = sumTotalUnits()

    const showModal = ( (contenLabel, messages) => {
        setModalContentLabel(contenLabel)
        setModalContentElement(
            <div className="modal-content-container">
            <div className="modal-content">
            {messages.map( (message) => {
                    return <p key={message}>{message}</p>
                })}
            <button onClick={() => handleCloseModal()}>Ok</button>
            </div>
            </div>
        )
        setShouldShowModal(true)        
    })

    const handleCloseModal = () => {
        setShouldShowModal(false)
    }

    const handleChange = e => {
        const name = e.target.name.split('-')[0]
        const index = Number(e.target.name.split('-')[1])
        const value = e.target.value

        const p = propositions.slice()
        const proposition = p[index - 1]
        //event start new Date('September 4, 2010 10:00 AM')
        // const currentTime = new Date('September 1, 2010 10:00 AM')
        const currentTime = new Date(Date.now())
        if (currentTime > eventStart) {
            p.forEach(proposition => {
                proposition.isTooLate = true
            });
            setPropositions(p)
            showModal('Event has already started.', ['Event has already started.'])
            return        
        }

        if (currentTime > proposition.info.start) {
            proposition.isTooLate = true
            setPropositions(p)
            showModal('Can\'t change game.', ['Game ' + index + ' has already started.'])
            return
        }

        if (name === 'units') {
            proposition.pick.units = value
        }
        if (name === 'matchup') {
            proposition.pick.selection = value
        }
        if (name === 'clear') {
            if (proposition.group.name === 'required') {
                proposition.pick.selection = proposition.matchup.vis
                proposition.pick.units = value
            }
            if (proposition.group.name === 'optional') {
                proposition.pick.selection = ''
                proposition.pick.units = 0
            }
        }
        proposition.pick.isChanged = true
        setIsSaved(false)
        setPropositions(p)
    }

    const handleSave = () => {
        //event start new Date('September 4, 2010 10:00 AM')
        //const currentTime = new Date('September 1, 2010 10:00 AM')
        const currentTime = new Date(Date.now())
        if (currentTime > eventStart) {
            const p = propositions.slice()
            p.forEach(proposition => {
                const originalPick = Object.assign({}, proposition.originalPick);
                proposition.pick = originalPick
                proposition.isTooLate = true
            });
            setPropositions(p)
            showModal('Event has already started.', ['Event has already started.'])
            return        
        }
        
        let messages = [];
        let invalid = false
        const p = propositions.slice()
        for (let proposition of p) {
            if (proposition.pick.isChanged && (currentTime > proposition.info.start)) {
                messages.push(proposition.matchup.visitor + ' vs ' + proposition.matchup.home + ' game has already started.')
                const originalPick = Object.assign({}, proposition.originalPick);
                proposition.pick = originalPick
                proposition.isTooLate = true
                setPropositions(p)
                invalid = true
            }

            if (proposition.pick.selection === '' && proposition.pick.units > 0) {
                messages.push('Can\'t save. Please make a pick for the ' + proposition.matchup.visitor + ' vs ' + proposition.matchup.home + ' game.')
                invalid = true
            }

            if (proposition.pick.selection !== '' && proposition.pick.units === 0) {
                messages.push('Can\'t save. Please select units for the ' + proposition.matchup.visitor + ' vs ' + proposition.matchup.home + ' game.')
                invalid = true
            }
        }

        if (totalUnits > maxUnits) {
            messages.push('Can\'t save. You are over 200 units.')
            invalid = true
        }

        if (invalid) {
            showModal('Can\'t save.', messages)
            return   
        }

        for (let proposition of p) {
            if (proposition.pick.isChanged) {
                proposition.pick.isChanged = false
                const pick = Object.assign({}, proposition.pick)
                proposition.originalPick = pick
                savePick({
                    userId: userId,
                    week: parseInt(eventWeek),
                    game: parseInt(proposition.matchup.number),
                    pick: proposition.pick.selection,
                    value: parseInt(proposition.pick.units),
                    year: eventYear
                })
            }
        }
        setPropositions(p)
        setIsSaved(true)
    }

    return (
        <div className="event">
            {deadLine}
            <div className="group1">
                <Group
                    isSaved={isSaved}
                    groupName={'Required Games'}
                    propositions={requiredGames}
                    maxUnits={maxUnits}
                    totalUnits={totalUnits}
                    onChange={ e => handleChange(e) }
                    onSave={ () => handleSave() } />
            </div>
            <div className="group2">
                <Group
                    isSaved={isSaved}
                    groupName={'Optional Games'}
                    propositions={optionalGames}
                    maxUnits={maxUnits}
                    totalUnits={totalUnits}
                    onChange={ e => handleChange(e) }
                    onSave={ () => handleSave() } />
            </div>
            <ReactModal
                appElement={document.querySelector('.event')}
                isOpen={shouldShowModal}
                contentLabel={modalContentLabel}
                contentElement={() => modalContentElement} >
            </ReactModal>
        </div>
    )
}

function setDeadLine(eventStart, eventYear, eventWeek) {
    const gridLink = (
        <a href={'http://big12pickem.com/results_grid_' + eventYear + '.asp?w=' + eventWeek}
            target="_blank">View Grid</a>
    )
    const currentTime = new Date(Date.now())
    const tooLate = currentTime > eventStart
    const user = sessionStorage.getItem('user')
    const userString = JSON.parse(user)
    const firstName = userString?.FirstName
    console.log(user);
    const deadLinePassed = (
        <div className="deadline">Hi {firstName}! The pick deadline has passed: {gridLink}</div>
    )
    const deadLineNotPassed = (
        <div className="deadline">Hi {firstName}! Make picks by Saturday 11:00 AM CST</div>
    )
    const deadLine = tooLate ? deadLinePassed : deadLineNotPassed
    return deadLine
}
