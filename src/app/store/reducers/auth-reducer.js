// Initial state of shop
const initialShop = {
  shopId: localStorage.getItem("shopId"),
  customerId: localStorage.getItem("customerId"),
  phoneNumber: localStorage.getItem("phoneNumber"),
}

const authenReducer = (state = initialShop, { type, payload }) => {
  switch (type) {
    case "ADD_TO_SESSION_SHOP":
      localStorage.setItem("shopId", payload.shopId)
      if (payload.customerId) {
        localStorage.setItem("customerId", payload.customerId)
      }
      localStorage.setItem("phoneNumber", payload.phoneNumber)
      return {
        shopId: payload.shopId,
        customerId: payload.customerId,
        phoneNumber: payload.phoneNumber,
      }
    case "CLEAR_SESSION_SHOP":
      localStorage.removeItem("shopId")
      localStorage.removeItem("customerId")
      localStorage.removeItem("phoneNumber")
      return {
        shopId: null,
        customerId: null,
        phoneNumber: null,
      }
    default:
      return state
  }
}

export default authenReducer
