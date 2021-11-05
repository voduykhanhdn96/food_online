import { useState } from "react"
import { useCallback } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrder } from "../store/actions/shop-action"
import OrderItem from "../components/OrderItem"
import { Table } from "semantic-ui-react"

const Order = () => {
  const authUser = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [listOrder, setListOrder] = useState([])

  const fetchListOrder = useCallback(async () => {
    const response = await dispatch(fetchOrder(authUser.customerId))
    setListOrder(response)
  }, [authUser.customerId, dispatch])

  useEffect(() => {
    fetchListOrder()
  }, [fetchListOrder])

  return (
    <>
      <Table color="violet" key="violet">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order Id</Table.HeaderCell>
            <Table.HeaderCell>Shop Name</Table.HeaderCell>
            <Table.HeaderCell>Phone Shop</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Order Time</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {listOrder.orders &&
          listOrder.orders.map(order => (
            <OrderItem order={order} key={order.orderId} />
          ))}
      </Table>
    </>
  )
}

export default Order
