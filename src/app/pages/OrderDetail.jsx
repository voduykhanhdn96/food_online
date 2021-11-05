import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { takeOrder } from "../store/actions/shop-action"
import ProcessStatus from "../components/ProcessStatus/ProcessStatus"
import { Divider } from "semantic-ui-react"
import BillPerson from "../components/Bill/BillPerson"
import { generateId } from "../helpers/crypto-helper"

const OrderDetail = () => {
  const { orderId } = useParams()
  const dispatch = useDispatch()

  const [stepOrder, setStepOrder] = useState(0)
  const [orderDetail, setOrderDetail] = useState([])

  const order = useSelector(state => state.shop.order)
  const groups = useSelector(state => state.shop.groups)
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    dispatch(takeOrder(orderId))
  }, [dispatch, orderId])

  useEffect(() => {
    if (notification.status === "completed" && !notification.error) {
      setOrderDetail(order)
      switch (order.status) {
        case "Cancelled":
          setStepOrder(-1)
          break
        case "Confirmed":
          setStepOrder(0)
          break
        case "Sent To Kitchen":
          setStepOrder(1)
          break
        case "Ready for Pickup":
          setStepOrder(2)
          break
        case "Ready for Delivery":
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

  console.log(groups)
  return (
    <>
      {orderDetail.length === 0 && notification.status === "completed" && (
        <h1>Don't have this order, please check again </h1>
      )}
      {orderDetail.length !== 0 && (
        <>
          <ProcessStatus orderInfo={orderDetail} step={stepOrder} />
          <Divider />
          {groups && <BillPerson key={generateId()} orderPerson={groups} />}
        </>
      )}
    </>
  )
}

export default OrderDetail