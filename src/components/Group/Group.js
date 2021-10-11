import React from 'react'
import './Group.css'
import Proposition from '../Proposition/Proposition'

export default function Group(props) {
  const isSaved = props.isSaved
  const saveBGColor = isSaved ? '#CCCCCC' : '#0099CC'
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
        <div className="event-units" style={hasExceededMaxUnits ? { color: 'indianred' } : { color: 'lightgreen' }} >
          {totalUnits}/{maxUnits}
        </div>
        <div className="group-name">
          {props.groupName}
        </div>
        <div className="save-event-container">
          <button
            disabled={isSaved}
            name="save"
            className="save-event"
            style={{ backgroundColor: saveBGColor }}
            onClick={props.onSave}>{isSaved ? 'Saved' : 'Save'}</button>

        </div>
      </div>
      <div className="group-area1">
        <div className="group-area">
          {group1.map( (proposition) => {
            return <Proposition
              key={proposition.key}
              matchup={proposition.matchup}
              pick={proposition.pick}
              info={proposition.info}
              group={proposition.group}
              isTooLate={proposition.isTooLate}
              onClear={props.onClear}
              onChange={props.onChange} />
            })}
        </div>
      </div>
      <div className="group-area2">
      <div className="group-area">
          {group2.map( (proposition) => {
            return <Proposition
              key={proposition.key}
              matchup={proposition.matchup}
              pick={proposition.pick}
              info={proposition.info}
              group={proposition.group}
              isTooLate={proposition.isTooLate}
              onClear={props.onClear}
              onChange={props.onChange} />
            })}
        </div>
      </div>
    </div>
  )
}