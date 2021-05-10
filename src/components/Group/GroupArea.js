import React from 'react'
import Proposition from '../Proposition/Proposition'

export default function GroupArea(props) {
    const propositions = props.propositions

    // todo: change this date to new Date() to return current time
    const currentTime = new Date('September 3, 2010 10:00:00')
    return (
        <div className="group-area">
            {propositions.map((proposition) => {
                return <Proposition
                    key={proposition.key}
                    matchup={proposition.matchup}
                    pick={proposition.pick}
                    info={proposition.info}
                    group={proposition.group}
                    currentTime={currentTime}
                    onChange={props.onChange} />
            })}
        </div>
    )
}