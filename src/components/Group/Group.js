import React from 'react'
import GroupArea from '../GroupArea/GroupArea'
import './Group.css'

export default function Group(props) {
    const propositions = props.propositions

    const group1 = propositions.slice(0, 5);
    const group2 = propositions.slice(5, 10);

    return (
        <div className="group">
            <div className="group-name">
                {props.groupName}
            </div>
            <div className="group-area1">
                <GroupArea  propositions={group1} />
            </div>
            <div className="group-area2">
                <GroupArea propositions={group2} />
            </div>
        </div>
    )
}