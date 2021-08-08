import React from 'react'
import './Proposition.css'

export default function Proposition(props) {
    // game odds : spread : moneyline : total
    // to win
 
    const visitor = props.matchup.visitor
    const vis = props.matchup.vis
    const home = props.matchup.home
    const ho = props.matchup.ho
    const favorite = props.matchup.favorite
    const spread = props.matchup.spread
    const number = props.matchup.number
    const visitorSpread = favorite === vis ? '(-' + spread + ')' : ''
    const homeSpread = favorite === ho ? '(-' + spread + ')' : ''

    const note = props.info.note
    const start = props.info.start
    const pickEarly = props.info.pickEarly

    const isTooLate = props.isTooLate

    const formatPickEarlyStart = (start) => {
        return 'pick by: ' + start.toLocaleDateString() + ' ' + start.toLocaleTimeString() //+ m + '/' + d + '/' + y + ' ' + h + ':' + (mi < 10 ? '0' + mi : mi)
    }

    const pickUnitOptions = GetPickUnitOptions()

    const clearButton = !isTooLate ? (
        <button
            className="reset"
            value={props.group.minUnitsAllowed}
            name={'clear-' + number}
            onClick={props.onChange}>clear</button>
    ) : (<div> </div>)

    return (
        <div className={'proposition' + (isTooLate ? ' tooLate' : '')}>
            <div className="proposition-pick">
                <div className="proposition-visitor">
                    <label htmlFor={vis + '-radio'}>
                        <input
                            id={vis + '-radio'}
                            type="radio" 
                            name={'matchup-' + number}
                            value={vis}
                            checked={props.pick.selection === vis}
                            onChange={props.onChange}
                            disabled={isTooLate ? 'disabled' : ''} /> {visitor}</label>
                </div>
                <div className="spread">
                    <span>{visitorSpread}</span>
                </div>
                <div className="proposition-home">
                    <label htmlFor={ho + '-radio'}>
                        <input
                            id={ho + '-radio'}
                            type="radio"
                            name={'matchup-' + number}
                            value={ho}
                            checked={props.pick.selection === ho}
                            onChange={props.onChange}
                            disabled={isTooLate ? 'disabled' : ''} /> {home}</label>
                </div>
                <div className="spread">
                    <span>{homeSpread}</span>
                </div>
                <div className="proposition-info">
                    <div className="proposition-note" style={isTooLate ? {color: 'white'} : {}}>
                        {note}
                    </div>
                    <div className="proposition-start" style={isTooLate ? {color: 'white'} : {}}>
                        {pickEarly ? formatPickEarlyStart(start) : ''}
                    </div>
                </div>
            </div>
            <div className="proposition-weight">
                <div>
                    <select
                        name={'units-' + number}
                        value={props.pick.units}
                        onChange={props.onChange}
                        disabled={isTooLate ? 'disabled' : ''} >
                        {pickUnitOptions}
                    </select>
                </div>
                <div className="clear">
                    {clearButton}
                </div>
            </div>
        </div>
    )

    function GetPickUnitOptions() {
        const pickUnits = []
        for (let i = props.group.minUnitsAllowed; i <= props.group.maxUnitsAllowed; i++) {
            pickUnits.push(i)
        }
        const pickUnitOptions = pickUnits.map((unit) => {
            return <option key={unit} value={unit}>{unit}</option>
        })
        return pickUnitOptions
    }
}