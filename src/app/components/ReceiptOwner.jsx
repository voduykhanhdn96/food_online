import { Menu } from "semantic-ui-react"

const ReceiptOwner = ({ handleOwnerClick, owner, userName, id }) => {
  return (
    <Menu.Item
      content={userName}
      active={owner === id}
      onClick={() => handleOwnerClick(id)}
    />
  )
}
export default ReceiptOwner
