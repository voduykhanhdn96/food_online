import { useParams } from "react-router"
import MenuItemList from "../components/MenuItemList"
import { Grid, Header, Segment } from "semantic-ui-react"
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
import { LogLevel, HubConnectionBuilder } from "@microsoft/signalr"
import { useCallback } from "react"
import { useHistory } from "react-router"
import { SIGNALR_HUB_URL } from "./../../env"

const StoreDetail = () => {
  const param = useParams()
  const [isClick, setIsClick] = useState(false)
  const [isInit, setIsInit] = useState(true)
  const { toastSuccess, toastError } = useToast()
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  const auth = useSelector(state => state.auth)
  const shop = useSelector(state => state.shop.cart)
  const notification = useSelector(state => state.notification)

  const addToCart = id => {
    setIsClick(true)
    dispatch(addItemToCart(auth.customerId, id, shop.cartId))
  }

  const startCons = useCallback(async () => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${SIGNALR_HUB_URL}/cart?cart=${shop.cartId}`, {
        withCredentials: false,
      })
      .configureLogging(LogLevel.Information)
      .build()

    try {
      await connection.start()
    } catch (e) {
      console.log(e)
    }

    connection.on("AddItemToCart", message => {
      dispatch(initialCartData(message.cartId))
    })
    connection.on("RemoveItemFromCart", message => {
      dispatch(initialCartData(message.cartId))
    })
    connection.on("SubmitItems", message => {
      dispatch(initialCartData(message.cartId))
    })
    connection.on("UnSubmitItems", message => {
      dispatch(initialCartData(message.cartId))
    })
    connection.on("NewOrder", message => {
      history.push(`/order/${message.orderId}`)
    })
  }, [dispatch, history, shop.cartId])

  const removeItem = id => {
    setIsClick(true)
    dispatch(removeItemFromCart(auth.customerId, id, shop.cartId))
  }

  const isChange = () => {
    setIsClick(true)
  }

  useEffect(() => {
    startCons()
  }, [startCons])

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
      {(!isInit || isClick || notification.status !== "pending") && shop.shop && (
        <>
          <Header size="medium" color="red">
            {shop.shop.name}
          </Header>

          <Grid>
            <Grid.Column width={10}>
              <Segment raised loading={notification.status === "pending"}>
                {shop.shop.items && (
                  <MenuItemList
                    items={shop.shop.items.filter(
                      item => item.isActive !== false
                    )}
                    addToCart={addToCart}
                  ></MenuItemList>
                )}
                {shop.shop.items.length === 0 && <h1>Don't have any items</h1>}
              </Segment>
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

export default StoreDetail
