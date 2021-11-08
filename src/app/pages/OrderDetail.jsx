import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { takeOrder } from "../store/actions/shop-action"
import { List, Segment } from "semantic-ui-react"
import Receipt from "../components/Receipt"
import { generateId } from "../helpers/crypto-helper"
import { LogLevel, HubConnectionBuilder } from "@microsoft/signalr"
import ProgressStatus from "../components/ProgressStatus/ProgressStatus"
import { SIGNALR_HUB_URL } from "./../../env"
import { formatCurrency } from "../helpers/number-helper"
import dayjs from "dayjs"

const OrderDetail = () => {
  const { orderId } = useParams()
  const dispatch = useDispatch()

  const startCons = useCallback(async () => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${SIGNALR_HUB_URL}/order?order=${orderId}`, {
        withCredentials: false,
      })
      .configureLogging(LogLevel.Information)
      .build()

    try {
      await connection.start()
    } catch (e) {
      console.log(e)
    }

    connection.on("ChangeOrderStatus", message => {
      dispatch(takeOrder(orderId))
    })
    connection.on("CancelOrder", message => {
      dispatch(takeOrder(orderId))
    })
  }, [dispatch, orderId])

  const [stepOrder, setStepOrder] = useState(0)
  const [orderDetail, setOrderDetail] = useState([])

  const order = useSelector(state => state.shop.order)
  const groups = useSelector(state => state.shop.groups)
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    dispatch(takeOrder(orderId))
  }, [dispatch, orderId])

  useEffect(() => {
    startCons()
  }, [startCons])

  useEffect(() => {
    if (notification.status === "completed" && !notification.error) {
      setOrderDetail(order)
      switch (order.status) {
        case "Cancelled":
          setStepOrder(-1)
          break
        case "Confirmed":
          setStepOrder(1)
          break
        case "Sent To Kitchen":
          setStepOrder(2)
          break
        case "Ready for Pickup":
          setStepOrder(3)
          break
        case "Delivered":
          setStepOrder(4)
          break
        default:
          setStepOrder(0)
      }
    }
  }, [notification, order])

  return (
    <>
      {orderDetail.length === 0 && notification.status === "completed" && (
        <h1>Don't have this order, please check again </h1>
      )}
      {orderDetail.length !== 0 && (
        <>
          <Segment raised color="red">
            <List divided relaxed>
              <List.Item>
                <List.Icon
                  color="red"
                  style={{ minWidth: "50px" }}
                  name="home"
                  size="large"
                  verticalAlign="middle"
                />
                <List.Content>
                  <List.Header>{orderDetail.shopName}</List.Header>
                  <List.Description>Shop Name</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon
                  color="red"
                  style={{ minWidth: "50px" }}
                  name="time"
                  size="large"
                  verticalAlign="middle"
                />
                <List.Content>
                  <List.Header>
                    {dayjs(orderDetail.orderTime).format("DD/MM/YYYY HH:mm")}
                  </List.Header>
                  <List.Description>Order Time</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon
                  color="red"
                  style={{ minWidth: "50px" }}
                  name="money bill alternate"
                  size="large"
                  verticalAlign="middle"
                />
                <List.Content>
                  <List.Header>
                    {formatCurrency(orderDetail.totalPrice)}
                  </List.Header>
                  <List.Description>Total Price</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Segment>
          <ProgressStatus orderInfo={orderDetail} step={stepOrder} />
          {groups && <Receipt key={generateId()} groups={groups} />}
        </>
      )}
    </>
  )
}

export default OrderDetail
