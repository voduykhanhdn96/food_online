import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { takeOrder } from "../../store/actions/shop-action"
import { Divider } from "semantic-ui-react"
import Receipt from "../../components/Receipt"
import { generateId } from "../../helpers/crypto-helper"
import { LogLevel, HubConnectionBuilder } from "@microsoft/signalr"
import ProgressStatus from "../../components/ProgressStatus/ProgressStatus"

const OrderDetail = () => {
  const { orderId } = useParams()
  const dispatch = useDispatch()

  const startCons = useCallback(async () => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:8080/hubs/order?order=" + orderId, {
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
          <ProgressStatus orderInfo={orderDetail} step={stepOrder} />
          <Divider />
          {groups && <Receipt key={generateId()} groups={groups} />}
        </>
      )}
    </>
  )
}

export default OrderDetail
