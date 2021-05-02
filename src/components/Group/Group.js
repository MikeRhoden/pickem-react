import React from 'react'
import GroupArea from '../GroupArea/GroupArea'
import './Group.css'

export default function Group(props) {
    const propositions = props.propositions
    const pivot = Math.floor(propositions.length / 2)
    const group1 = propositions.slice(0, pivot)
    const group2 = propositions.slice(pivot)

    return (
        <div className="group">
            <div className="group-name">
                {props.groupName}
                <div className="save-event-container">
                    <button className="save-event">Save</button>
                </div>
            </div>
            <div className="group-area1">
                <GroupArea propositions={group1} onChange={props.onChange} />
            </div>
            <div className="group-area2">
                <GroupArea propositions={group2} onChange={props.onChange} />
            </div>
        </div>
    )
}