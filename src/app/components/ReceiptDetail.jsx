import React from "react"
import { Table, Image } from "semantic-ui-react"
import { formatCurrency } from "../helpers/number-helper"

const ReceiptDetail = ({ item }) => {
  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          {" "}
          <Image
            src={`data:image/jpeg;base64,${item.image}`}
            rounded
            size="mini"
          />
        </Table.Cell>
        <Table.Cell>{item.itemName}</Table.Cell>
        <Table.Cell>{item.amount}</Table.Cell>
        <Table.Cell>{formatCurrency(item.price)}</Table.Cell>
        <Table.Cell>{formatCurrency(item.price * item.amount)}</Table.Cell>
      </Table.Row>
    </Table.Body>
  )
}
export default ReceiptDetail
