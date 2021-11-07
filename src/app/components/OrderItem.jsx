import { formatCurrency } from "../helpers/number-helper"
import { useHistory } from "react-router-dom"
import { Table, Button } from "semantic-ui-react"
import moment from "moment"
import StatusCellRenderer from "../pages/ViewOrders/StatusCellRenderer"

const OrderItem = ({ order }) => {
  const history = useHistory()
  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell>{order.orderId}</Table.Cell>
        <Table.Cell>{order.shopName}</Table.Cell>
        <Table.Cell>{order.phoneNumberOfShop}</Table.Cell>
        <Table.Cell>{formatCurrency(order.totalPrice)}</Table.Cell>
        <Table.Cell>
          {moment(order.orderTime).format("DD MMM, YYYY")}
        </Table.Cell>
        <Table.Cell>
          <StatusCellRenderer value={order.status} />
        </Table.Cell>
        <Table.Cell>
          <Button
            variant="contained"
            onClick={() => history.push("/order/" + order.orderId)}
          >
            {" "}
            View Order{" "}
          </Button>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  )
}

export default OrderItem
