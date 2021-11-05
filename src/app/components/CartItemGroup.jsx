import { useDispatch } from "react-redux"
import { Container, Grid, Header, Segment } from "semantic-ui-react"
import {
  submitItemOfCustomer,
  unSubmitItemOfCustomer,
} from "../store/actions/shop-action"
import CartItem from "./CartItem"

const CartItemGroup = ({
  group,
  permission,
  removeItem,
  cartId,
  isChange,
  customerId,
}) => {
  const { userName, userId, items } = group
  const dispatch = useDispatch()

  const onChangeStatusFood = e => {
    if (e.target.checked) {
      // Submit
      dispatch(submitItemOfCustomer(items, userId, cartId))
    } else {
      dispatch(unSubmitItemOfCustomer(userId, cartId))
    }
    isChange()
  }

  return (
    <>
      {customerId !== userId && (
        <div className="ui toggle checkbox">
          <input
            onChange={onChangeStatusFood}
            disabled={!permission}
            checked={items[0].readyToOrder}
            type="checkbox"
            name="public"
          />
          <label>COMPLETE</label>
        </div>
      )}

      <Segment raised>
        <Header size={"small"}>{userName}</Header>
        <Container>
          <Grid>
            {items &&
              items.map(item => (
                <CartItem
                  removeItem={removeItem}
                  key={item.itemId}
                  item={item}
                  permission={permission}
                ></CartItem>
              ))}
          </Grid>
        </Container>
      </Segment>
    </>
  )
}

export default CartItemGroup
