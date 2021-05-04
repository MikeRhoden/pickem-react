import { useState, React } from 'react'
import Group from '../Group/Group'
import './Event.css'
import MockPropositions from './MockPropositions.js'


export default function Event(props) {
    const id = props.event.id
    const start = props.event.start
    const maxUnits = props.event.maxUnits

    const [ propositions, setPropositions ] = useState(MockPropositions(id))
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

    const handleChange = e => {
        //todo check time
        const name = e.target.name.split('-')[0]
        const index = Number(e.target.name.split('-')[1])
        const value = e.target.value

        const p = propositions.slice()
        const proposition = p[index - 1]

        // todo: change this date to new Date() to return current time
        if (new Date('September 5, 2020 11:00:00') > start) {
            alert('this week\'s deadline has passed')
            return
        }
        // todo: change this date to new Date() to return current time
        if (new Date('September 5, 2020 11:00:00') > proposition.info.start) {
            alert('this game has already started')
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

        setPropositions(p)
    }

    const handleSave = () => {
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
    }

    return (
        <div className="event">
            <div className="group1">
                <Group
                    groupName={'Required Games'}
                    propositions={requiredGames}
                    maxUnits={maxUnits}
                    totalUnits={totalUnits}
                    onChange={ e => handleChange(e) }
                    onSave={ () => handleSave() } />
            </div>
            <div className="group2">
                <Group
                    groupName={'Optional Games'}
                    propositions={optionalGames}
                    maxUnits={maxUnits}
                    totalUnits={totalUnits}
                    onChange={ e => handleChange(e) }
                    onSave={ () => handleSave() } />
            </div>
        </div>
    )
}