// Initial state of shop
const initialStateAdmin = {
  shop: [],
  orderList: [],
}

const adminReducer = (state = initialStateAdmin, { type, payload }) => {
  switch (type) {
    case "INITIAL_SHOP":
      return { ...state, shop: payload.shopDetail }
    case "INITIAL_ORDER":
      return { ...state, orderList: payload.orderList }
    default:
      return state
  }
}

export default adminReducer
