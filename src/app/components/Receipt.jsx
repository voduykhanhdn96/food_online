import { useState } from "react"
import { Menu, Segment } from "semantic-ui-react"
import ReceiptOwner from "./ReceiptOwner"
import ReceiptDetail from "./ReceiptDetail"
import { Table } from "semantic-ui-react"

const Receipt = ({ groups }) => {
  const [owner, setOwner] = useState(groups[0].userId)

  const handleOwnerClick = name => {
    setOwner(name)
  }

  const orderDetail = groups.filter(order => order.userId.includes(owner))

  return (
    <div>
      <Menu attached="top" tabular>
        {groups.map(person => (
          <ReceiptOwner
            handleOwnerClick={handleOwnerClick}
            owner={owner}
            key={person.userId}
            id={person.userId}
            userName={person.userName}
          />
        ))}
      </Menu>

      <Segment raised attached="bottom">
        <Table color="brown" key="brown" inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Food</Table.HeaderCell>
              <Table.HeaderCell>Food Name</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {orderDetail.length !== 0 &&
            orderDetail[0].items.map(item => (
              <ReceiptDetail key={item.itemId} item={item} />
            ))}
        </Table>
      </Segment>
    </div>
  )
}
export default Receipt
