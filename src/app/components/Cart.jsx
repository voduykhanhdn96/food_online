import { Button, Divider, Header, Label } from "semantic-ui-react"
import { formatCurrency } from "./../helpers/number-helper"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useRef } from "react"
import CartItemGroup from "./CartItemGroup"
import CheckOutModal from "./Checkout/CheckOutModal"
import { APP_URL } from "./../../env"

const Cart = ({ cart, removeItem, isChange }) => {
  const modalRef = useRef(null)

  const dispatch = useDispatch()
  const userAuth = useSelector(state => state.auth)
  const groups = useSelector(state => state.shop.groups)

  const { cartId, itemsInCart, totalPrice, customerId } = cart

  const checkout = () => {
    modalRef.current.open()
  }

  useEffect(() => {
    dispatch({ type: "SETTING_GROUP", payload: { itemsInCart: itemsInCart } })
  }, [dispatch, itemsInCart])

  const share = () => {
    navigator.clipboard.writeText(`${APP_URL}/cart/` + cartId)
  }
  return (
    <>
      <Header>Cart #{cartId.toUpperCase()}</Header>
      <Label
        horizontal
        style={{ fontSize: "15px", width: "100%", textAlign: "left" }}
      >
        Total:
        <span style={{ float: "right" }}>
          {formatCurrency(totalPrice || 0)}
        </span>
      </Label>
      <Button
        content="Submit"
        labelPosition="left"
        icon="thumbs up outline"
        color="red"
        onClick={checkout}
        size={"tiny"}
        disabled={
          customerId !== userAuth.customerId || itemsInCart.length === 0
        }
        style={{ marginTop: 15, width: "100%" }}
      />
      <Button
        content="Share"
        labelPosition="left"
        icon="share alternate"
        color="green"
        size={"tiny"}
        onClick={share}
        disabled={
          customerId !== userAuth.customerId || itemsInCart.length === 0
        }
        style={{ marginTop: 15, width: "100%" }}
      />
      <Divider></Divider>
      {groups &&
        groups
          .filter(groupFilter => groupFilter.userId === customerId)
          .map(group => (
            <CartItemGroup
              isChange={isChange}
              removeItem={removeItem}
              cartId={cartId}
              key={group.id}
              group={group}
              customerId={customerId}
              permission={group.userId === userAuth.customerId}
            ></CartItemGroup>
          ))}
      {groups &&
        groups
          .filter(groupFilter => groupFilter.userId !== customerId)
          .map(group => (
            <CartItemGroup
              isChange={isChange}
              removeItem={removeItem}
              cartId={cartId}
              key={group.id}
              group={group}
              customerId={customerId}
              permission={group.userId === userAuth.customerId}
            ></CartItemGroup>
          ))}
      <CheckOutModal
        cartId={cartId}
        ref={modalRef}
        groups={groups}
        totalPrice={totalPrice}
      ></CheckOutModal>
    </>
  )
}

export default Cart
