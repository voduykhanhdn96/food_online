import { formatCurrency } from "../../helpers/number-helper"
import { Table } from "semantic-ui-react"

const ViewCart = ({ item }) => {
  const { customerName, itemName, price, amount } = item

  return (
    <>
      <Table.Row>
        <Table.Cell>{customerName}</Table.Cell>
        <Table.Cell>{itemName}</Table.Cell>
        <Table.Cell>{formatCurrency(price)}</Table.Cell>
        <Table.Cell>{amount}</Table.Cell>
        <Table.Cell>{formatCurrency(price * amount)}</Table.Cell>
      </Table.Row>
    </>
  )
}

export default ViewCart
