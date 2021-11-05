import { Grid, Header, Icon } from "semantic-ui-react"
import { formatCurrency } from "./../helpers/number-helper"

const CartItem = ({ item, permission, removeItem }) => {
  const { itemName, price, amount, itemId } = item
  return (
    <Grid.Row columns={4}>
      <Grid.Column width={1}>
        <span className="cart-remove">
          <Icon
            onClick={() => removeItem(itemId)}
            disabled={!permission}
            name="delete"
            color="red"
          />
        </span>
      </Grid.Column>
      <Grid.Column width={8}>
        <Header size="tiny" className="cart-item-name">
          {itemName}
        </Header>
      </Grid.Column>
      <Grid.Column width={2}>
        <span className="cart-quantity">x{amount}</span>
      </Grid.Column>
      <Grid.Column width={4}>
        <Header size="tiny" className="cart-subtotal">
          {formatCurrency(price * amount)}
        </Header>
      </Grid.Column>
    </Grid.Row>
  )
}

export default CartItem
