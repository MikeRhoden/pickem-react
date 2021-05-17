import React from 'react'
import Proposition from '../Proposition/Proposition'

export default function GroupArea(props) {
    const propositions = props.propositions

    return (
        <div className="group-area">
            {propositions.map((proposition) => {
                return <Proposition
                    key={proposition.key}
                    matchup={proposition.matchup}
                    pick={proposition.pick}
                    info={proposition.info}
                    group={proposition.group}
                    isTooLate={proposition.isTooLate}
                    onChange={props.onChange} />
            })}
        </div>
    )
}