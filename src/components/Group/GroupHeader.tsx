type GroupHeaderProps = {
  totalUnits: number;
  maxUnits: number;
  groupName: string;
  isSaved: boolean;
  onSave: () => void
}

export const GroupHeader: React.FC<GroupHeaderProps> = (props) => {
  const { totalUnits, maxUnits, isSaved, groupName, onSave } = props
  const saveBGColor = isSaved ? '#CCCCCC' : '#0099CC'
  const hasExceededMaxUnits = totalUnits > maxUnits
  return (
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
          onClick={onSave}>{isSaved ? 'Saved' : 'Save'}</button>
      </div>
    </div>
  )
}