import React from 'react'
import Proposition from '../Proposition/Proposition'

export default function GroupArea(props) {
    const propositions = props.propositions

    return (
        <div className="group-area">
            {propositions.map((proposition) => {
                const key = proposition.year + '-' + proposition.week + '-' + proposition.game
                return <Proposition
                    key={key}
                    visitor={proposition.visitor}
                    vis={proposition.vis}
                    home={proposition.home}
                    ho={proposition.ho}
                    favorite={proposition.favorite}
                    spread={proposition.spread}
                    note={proposition.note}
                    start={proposition.start} />
            })}
        </div>
    )
}