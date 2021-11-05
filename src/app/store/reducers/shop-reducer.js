// Initial state of shop
const initialStateShop = {
  cart: [],
  groups: [],
  order: [],
}

const shopReducer = (state = initialStateShop, { type, payload }) => {
  switch (type) {
    case "INITIAL_CART":
      return { cart: payload.cart }
    case "INITIAL_ORDER":
      return {
        ...state,
        order: payload.order,
      }
    case "SETTING_GROUP":
      const itemsInCart = payload.itemsInCart
      let userId = null
      let groupTemp = []
      for (const key in itemsInCart) {
        if (userId === itemsInCart[key].customerId) {
          const index = groupTemp.findIndex(
            group => group.userId === itemsInCart[key].customerId
          )
          const newItems = groupTemp[index].items.concat(itemsInCart[key])
          groupTemp[index] = {
            ...groupTemp[index],
            items: newItems,
          }
        } else {
          groupTemp.push({
            id: +key,
            userId: itemsInCart[key].customerId,
            userName: itemsInCart[key].customerName,
            items: [itemsInCart[key]],
          })
          userId = itemsInCart[key].customerId
        }
      }

      return {
        ...state,
        groups: groupTemp,
      }
    default:
      return state
  }
}

export default shopReducer
