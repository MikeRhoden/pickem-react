import './Group.css'

type GroupProps = {
  group1: JSX.Element[];
  groupHeader: JSX.Element;
}

export const BowlGroup3: React.FC<GroupProps> = (props) => {
  return (
    <div className="bowl-group bowl-group3">
      {props.groupHeader}q
      <div className="bowl-tier3-group">
        <div className="group-area">
          {props.group1}
        </div>
      </div>
    </div>
  )
}