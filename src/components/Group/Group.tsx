import React, { MouseEventHandler } from 'react'
import './Group.css'

interface IGroupProps {
  isSaved: boolean;
  totalUnits: number;
  maxUnits: number;
  groupName: string;
  onSave: MouseEventHandler;
  group1: any;
  group2: any;
}

export default function Group(props: IGroupProps) {
  const isSaved = props.isSaved
  const saveBGColor = isSaved ? '#CCCCCC' : '#0099CC'
  const totalUnits = props.totalUnits
  const maxUnits = props.maxUnits
  const hasExceededMaxUnits = totalUnits > maxUnits
  const groupName = props.groupName

  return (
    <div className="group">
      <div className="group-header">
        <div className="event-units" style={hasExceededMaxUnits ? { color: 'indianred' } : { color: 'lightgreen' }} >
          {totalUnits}/{maxUnits}
        </div>
        <div className="group-name">
          {groupName}
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
          {props.group1}
        </div>
      </div>
      <div className="group-area2">
        <div className="group-area">
          {props.group2}
        </div>
      </div>
    </div>
  )
}