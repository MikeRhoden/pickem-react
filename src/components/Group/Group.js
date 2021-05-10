import React from 'react'
import GroupArea from './GroupArea'
import './Group.css'

export default function Group(props) {
    const propositions = props.propositions
    const pivot = Math.floor(propositions.length / 2)
    const group1 = propositions.slice(0, pivot)
    const group2 = propositions.slice(pivot)
    const totalUnits = props.totalUnits
    const maxUnits = props.maxUnits
    const hasExceededMaxUnits = totalUnits > maxUnits

    return (
        <div className="group">
            <div className="group-header">
                <div className="group-name">
                    {props.groupName}
                </div>
                <div className="save-event-container">
                    <button
                        name="save"
                        className="save-event"
                        onClick={props.onSave}>Save</button>
                    <div className="event-units" style={ hasExceededMaxUnits ? {color: 'indianred'} : {color: 'lightgreen'}} >
                        {totalUnits}/{maxUnits}
                    </div>
                </div>
            </div>
            <div className="group-area1">
                <GroupArea
                    propositions={group1}
                    onChange={props.onChange} />
            </div>
            <div className="group-area2">
                <GroupArea
                    propositions={group2}
                    onChange={props.onChange} />
            </div>
        </div>
    )
}