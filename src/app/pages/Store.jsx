import { useParams } from "react-router"
import MenuItemList from "./../components/MenuItemList"
import { Grid, Header } from "semantic-ui-react"
import Cart from "../components/Cart"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  checkExistCartCustomerWithShop,
  addItemToCart,
  removeItemFromCart,
  initialCartData,
} from "../store/actions/shop-action"
import { useState } from "react"
import useToast from "../hooks/useToast"
import { useLocation } from "react-router-dom"
import Load from "../components/Loader"

const Store = () => {
  const param = useParams()
  const [isClick, setIsClick] = useState(false)
  const [isInit, setIsInit] = useState(true)
  const { toastSuccess, toastError } = useToast()
  const location = useLocation()
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  const shop = useSelector(state => state.shop.cart)
  const notification = useSelector(state => state.notification)

  const addToCart = id => {
    dispatch(addItemToCart(auth.customerId, id, shop.cartId))
    setIsClick(true)
  }

  const removeItem = id => {
    dispatch(removeItemFromCart(auth.customerId, id, shop.cartId))
    setIsClick(true)
  }

  const isChange = () => {
    setIsClick(true)
  }

  useEffect(() => {
    if (isClick) {
      if (notification.status === "completed" && !notification.error) {
        toastSuccess("Food is added or removed into cart")
        setIsClick(false)
      }
      if (notification.status === "completed" && notification.error) {
        toastError(notification.error)
        setIsClick(false)
      }
    }
  }, [notification, isClick, toastSuccess, toastError])

  useEffect(() => {
    if (isInit) {
      console.log("cxzcxz")
      if (location.pathname.includes("store")) {
        dispatch(checkExistCartCustomerWithShop(auth.customerId, param.shopId))
      }
      if (location.pathname.includes("cart")) {
        dispatch(initialCartData(param.cartId))
      }
      setIsInit(false)
    }
  }, [dispatch, auth.customerId, param, location, isInit])

  return (
    <>
      {notification.status === "pending" && <Load />}
      {(isClick || notification.status !== "pending") && shop.shop && (
        <>
          <Header size="medium">Shop {shop.shop.name}</Header>
          <Grid>
            <Grid.Column width={10}>
              {shop.shop.items && (
                <MenuItemList
                  items={shop.shop.items.filter(
                    item => item.isActive !== false
                  )}
                  addToCart={addToCart}
                ></MenuItemList>
              )}
              {shop.shop.items.length === 0 && <h1>Don't have any items</h1>}
            </Grid.Column>

            <Grid.Column width={6}>
              <Cart
                cart={shop}
                removeItem={removeItem}
                isChange={isChange}
              ></Cart>
            </Grid.Column>
          </Grid>
        </>
      )}
    </>
  )
}

export default Store
