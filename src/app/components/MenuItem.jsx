import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Button, Grid, Icon, Image, List } from "semantic-ui-react"
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
    <List.Item className="menu-item">
      <List.Content>
        <Grid>
          <Grid.Column width={4}>
            <Image rounded src={`data:image/jpeg;base64,${image}`} />
          </Grid.Column>
          <Grid.Column width={10}>
            <List.Header as="a">{name}</List.Header>
            <List.Header>{formatCurrency(price)}</List.Header>
          </Grid.Column>
          <Grid.Column width={2}>
            <div className="menu-item_actions">
              {isActive && viewDetail && (
                <>
                  <Button
                    icon
                    color="blue"
                    onClick={() => viewDetail(itemId)}
                    title="Modify Item"
                  >
                    <Icon name="pencil" />
                  </Button>
                  <Button
                    icon
                    color="red"
                    title="Delete Item"
                    onClick={deleteItemHandle}
                  >
                    <Icon name="delete" />
                  </Button>
                </>
              )}
              {!isActive && viewDetail && (
                <Button
                  icon
                  color="green"
                  onClick={activeItemHandle}
                  title="Action Item"
                >
                  <Icon name="check" />
                </Button>
              )}

              {addToCart && (
                <Button
                  icon
                  color="green"
                  onClick={() => addToCart(itemId)}
                  title="Add to Cart"
                >
                  <Icon name="cart plus" />
                </Button>
              )}
            </div>
          </Grid.Column>
        </Grid>
      </List.Content>
    </List.Item>
  )
}

export default MenuItem
