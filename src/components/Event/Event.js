import { useState, React } from 'react'
import ReactModal from 'react-modal'
import Group from '../Group/Group'
import './Event.css'

export default function Event(props) {

    const [ propositions, setPropositions ] = useState(props.propositions)
    const [ isSaved, setIsSaved ] = useState(true)
    const [ shouldShowModal, setShouldShowModal ] = useState(false)
    const [ modalContentLabel, setModalContentLabel ] = useState('') 
    const [ modalContentElement, setModalContentElement] = useState(<> </>)

    const eventId = props.event.id
    const eventStart = props.event.start
    const maxUnits = props.event.maxUnits
    // const [eventYear, eventWeek] = eventId.split('-')

    const requiredGames = propositions.filter( p => p.group.name === 'required')
    const optionalGames = propositions.filter( p => p.group.name === 'optional')
    const sumTotalUnits = () => {
        const units = propositions.map( (p) => {
            return Number(p.pick.units)
        })
        return units.reduce( (sum, value) => {
            return sum + value
        })
    }    
    const totalUnits = sumTotalUnits()

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
            setModalContentLabel('Event has already started.')
            setModalContentElement(
                <div className="modal-content-container">
                <div className="modal-content">
                <p>Event has already started.</p>
                <button onClick={() => handleCloseModal()}>Ok</button>
                </div>
                </div>
            )
            setShouldShowModal(true)
            return        
        }

        if (currentTime > proposition.info.start) {
            proposition.isTooLate = true
            setPropositions(p)
            setModalContentLabel('Can\'t change game.')
            setModalContentElement(
                <div className="modal-content-container">
                <div className="modal-content">
                <p>Game {index} has already started.</p>
                <button onClick={() => handleCloseModal()}>Ok</button>
                </div>
                </div>
            )
            setShouldShowModal(true)
            return
        }

        if (name === 'units')
            proposition.pick.units = value
        if (name === 'matchup')
            proposition.pick.selection = value
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
                proposition.isTooLate = true
            });
            setPropositions(p)
            setModalContentLabel('Event has already started.')
            setModalContentElement(
                <div className="modal-content-container">
                <div className="modal-content">
                <p>Event has already started.</p>
                <button onClick={() => handleCloseModal()}>Ok</button>
                </div>
                </div>
            )
            setShouldShowModal(true)
            return        
        }
        
        let messages = [];
        let invalid = false
        const p = propositions.slice()
        for (let proposition of p) {
            if (proposition.pick.isChanged && currentTime > proposition.info.start) {
                messages.push(proposition.matchup.visitor + ' vs ' + proposition.matchup.home + ' game has already started.')
                const originalPick = Object.assign({}, proposition.originalPick);
                proposition.pick = originalPick
                proposition.isTooLate = true
                setPropositions(p)
                invalid = true
            }
            // need to test this
            if (proposition.pick.selection === '' && proposition.pick.units > 0) {
                messages.push('Can\'t save.  Please make a pick for the ' + proposition.matchup.visitor + ' vs ' + proposition.matchup.home + ' game.')
                invalid = true
            }
            // need to test this
            if (proposition.pick.selection !== '' && proposition.pick.units === 0) {
                messages.push('Can\'t save.  Please select units for the ' + proposition.matchup.visitor + ' vs ' + proposition.matchup.home + ' game.')
                invalid = true
            }
        }

        // need to test this
        if (totalUnits > maxUnits) {
            messages.push('Can\'t save.  You are over 200 units.')
            invalid = true
        }

        if (invalid) {
            setModalContentLabel('Error saving.')
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
            return   
        }

        // need to test this
        for (let proposition of p) {
            if (proposition.isChanged) {
                const pick = Object.assign({}, proposition.pick)
                pick.isChanged = false
                proposition.originalPick = pick
            }
        }
        setPropositions(p)
        setIsSaved(true)
    }

    return (
        <div className="event">
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