import { Menu } from "semantic-ui-react"

const BillName = props => {
  return (
    <Menu.Item
      content={props.userName}
      active={props.activePerson === props.id}
      onClick={() => {
        props.handlePersonClick(props.id)
      }}
    />
  )
}
export default BillName
