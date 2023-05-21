import './Group.css'

type GroupProps = {
  group1: any;
  group2: any;
  groupHeader: any;
}

export const Group: React.FC<GroupProps> = (props) => {
  return (
    <div className="group">
      {props.groupHeader}
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