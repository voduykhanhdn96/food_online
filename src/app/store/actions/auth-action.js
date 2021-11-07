import { loginShop } from "../../apis/shop-api"
import { loginCustomer } from "../../apis/customer-api"

export const loginAction = (phoneNumber, typeLogin) => {
  return async dispatch => {
    try {
      let session
      if (typeLogin === "SHOP") {
        session = await loginShop(phoneNumber)
      } else {
        session = await loginCustomer(phoneNumber)
      }
      dispatch({
        type: "ADD_TO_SESSION_SHOP",
        payload: {
          shopId: session.shopId,
          customerId: session.customerId,
          phoneNumber: session.phoneNumber,
        },
      })
      dispatch({ type: "SUCCESS" })
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: { errorMessage: error.message },
      })
      dispatch({ type: "CLEAR_SESSION_SHOP" })
    }
    dispatch({ type: "CLEAR_STATUS" })
  }
}

export const logoutAction = () => {
  return dispatch => {
    dispatch({ type: "CLEAR_SESSION_SHOP" })
  }
}
