import './Group.css'

type GroupProps = {
  group1: JSX.Element[];
  groupHeader: JSX.Element;
}

export const BowlGroup2: React.FC<GroupProps> = (props) => {
  return (
    <div className="bowl-group bowl-group2">
      {props.groupHeader}
      <div className="bowl-tier2-group">
        <div className="group-area">
          {props.group1}
        </div>
      </div>
    </div>
  )
}