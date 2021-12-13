import './Group.css'

type GroupProps = {
  group1: JSX.Element[];
  group2: JSX.Element[];
  group3: JSX.Element[];
  groupHeader: JSX.Element;
}

export const BowlGroup1: React.FC<GroupProps> = (props) => {
  return (
    <div className="bowl-group bowl-group1">
      {props.groupHeader}
      <div className="bowl-championship-group">
        <div className="group-area">
          {props.group1}
        </div>
      </div>
      <div className="group-separator" />
      <div className="bowl-playoff-group">
        <div className="group-area">
          {props.group2}
        </div>
      </div>
      <div className="group-separator" />
      <div className="bowl-tier1-group">
        <div className="group-area">
          {props.group3}
        </div>
      </div>
    </div>
  )
}