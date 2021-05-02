import React from 'react'
import Proposition from '../Proposition/Proposition'

export default function GroupArea(props) {
    const propositions = props.propositions

    return (
        <div className="group-area">
            {propositions.map((proposition) => {
                return <Proposition
                    key={proposition.key}
                    visitor={proposition.visitor}
                    vis={proposition.vis}
                    home={proposition.home}
                    ho={proposition.ho}
                    favorite={proposition.favorite}
                    spread={proposition.spread}
                    note={proposition.note}
                    start={proposition.start}
                    matchup={proposition.matchup}
                    pick={proposition.pick}
                    info={proposition.info}
                    group={proposition.group}
                    onChange={props.onChange} />
            })}
        </div>
    )
}