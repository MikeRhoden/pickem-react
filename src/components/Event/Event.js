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

        const currentTime = props.getCurrentTime()
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
        setIsSaved(false)
        setPropositions(p)
    }

    const handleSave = () => {
        console.log('Aaaaaaaa')
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
        
        let invalid = false
        for (let p of propositions) {
            if (p.pick.selection === '' && p.pick.units > 0) {
                alert('Can\'t save.  Please make a pick for the ' + p.matchup.visitor + ' vs ' + p.matchup.home + ' game.')
                invalid = true
                break
            }            
            if (p.pick.selection !== '' && p.pick.units === 0) {
                alert('Can\'t save.  Please select units for the ' + p.matchup.visitor + ' vs ' + p.matchup.home + ' game.')
                invalid = true
                break
            }
        }

        if (invalid) {
            return
        }

        if (totalUnits > maxUnits) {
            alert('Can\'t save.  You are over 200 units.')
            return
        }

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
                isOpen={shouldShowModal}
                contentLabel={modalContentLabel}
                contentElement={() => modalContentElement} >
            </ReactModal>
        </div>
    )
}