import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Button, Icon, Image, List } from "semantic-ui-react"
import { formatCurrency } from "./../helpers/number-helper"
import {
  activeThisItem,
  getShopDetail,
  deleteThisItem,
} from "../store/actions/admin-action"
import { useState } from "react"
import { useEffect } from "react"
import useToast from "../hooks/useToast"

const MenuItem = ({ item, viewDetail, addToCart }) => {
  const param = useParams()
  const { toastSuccess, toastError } = useToast()

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const [isClickActive, setIsClickActive] = useState(false)
  const [isClickDelete, setIsClickDelete] = useState(false)

  const { image, name, price, itemId, isActive } = item

  const activeItemHandle = () => {
    dispatch(activeThisItem(param.shopId, itemId))
    setIsClickActive(true)
  }

  const deleteItemHandle = () => {
    dispatch(deleteThisItem(param.shopId, itemId))
    setIsClickDelete(true)
  }

  useEffect(() => {
    if (isClickActive) {
      if (notification.status === "completed" && !notification.error) {
        toastSuccess("Active is success !")
        dispatch(getShopDetail(param.shopId))
        setIsClickActive(false)
      }
      if (notification.status === "completed" && notification.error) {
        toastError("Active is wrong !")
        setIsClickActive(false)
      }
    }
    if (isClickDelete) {
      if (notification.status === "completed" && !notification.error) {
        toastSuccess("Delete is success !")
        dispatch(getShopDetail(param.shopId))
        setIsClickDelete(false)
      }
      if (notification.status === "completed" && notification.error) {
        toastError("Delete is wrong !")
        setIsClickDelete(false)
      }
    }
  }, [
    dispatch,
    isClickActive,
    isClickDelete,
    notification,
    param,
    toastError,
    toastSuccess,
  ])

  return (
    <List.Item style={{ paddingTop: "10px", paddingBottom: "10px" }}>
      <List.Content floated="right">
        {addToCart && (
          <Button
            icon
            size={"tiny"}
            color="green"
            onClick={() => addToCart(itemId)}
            title="Add to Cart"
          >
            <Icon name="cart plus" />
          </Button>
        )}

        {!isActive && viewDetail && (
          <Button
            icon
            size={"tiny"}
            color="green"
            onClick={activeItemHandle}
            title="Action Item"
          >
            <Icon name="check" />
          </Button>
        )}

        {isActive && viewDetail && (
          <>
            <Button
              icon
              size={"tiny"}
              color="blue"
              onClick={() => viewDetail(itemId)}
              title="Modify Item"
            >
              <Icon name="pencil" />
            </Button>
            <Button
              icon
              size={"tiny"}
              color="red"
              title="Delete Item"
              onClick={deleteItemHandle}
            >
              <Icon name="delete" />
            </Button>
          </>
        )}
      </List.Content>
      <Image
        rounded
        inline
        src={
          image
            ? `data:image/jpeg;base64,${image}`
            : "https://dummyimage.com/900x900/ecf0f1/aaa"
        }
        style={{ width: "15%", marginRight: "20px" }}
      />
      <List.Content>
        <List.Header as="a">{name}</List.Header>
        <List.Header style={{ marginTop: "10px" }}>
          {formatCurrency(price)}
        </List.Header>
      </List.Content>
    </List.Item>
  )
}

export default MenuItem
