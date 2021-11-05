import { List } from "semantic-ui-react"
import MenuItem from "./MenuItem"

const MenuItemList = ({ items, viewDetail, addToCart }) => {
  return (
    <List size={"large"}>
      {items.map(item => (
        <MenuItem
          key={item.itemId}
          item={item}
          viewDetail={viewDetail}
          addToCart={addToCart}
        ></MenuItem>
      ))}
    </List>
  )
}

export default MenuItemList
