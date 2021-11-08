import { createShop, getShopById, updateShop } from "../../apis/shop-api"
import {
  createItem,
  updateItem,
  activeItem,
  deleteItem,
} from "../../apis/item-api"
import {
  changeStatus,
  getAllOrderWithStore,
  cancel,
} from "../../apis/order-api"

export const getListOrder = shopId => {
  return async dispatch => {
    dispatch({ type: "SEND" })
    try {
      const response = await getAllOrderWithStore(shopId)
      dispatch({
        type: "INITIAL_ORDER",
        payload: {
          orderList: response.orders,
        },
      })
      dispatch({ type: "SUCCESS" })
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } })
    }
    dispatch({ type: "CLEAR_STATUS" })
  }
}

export const changeStatusOrder = (orderId, orderStatus, customerId, shopId) => {
  return async dispatch => {
    dispatch({ type: "SEND" })
    try {
      await changeStatus(orderId, orderStatus, customerId, shopId)
      dispatch({ type: "SUCCESS" })
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: `${error}` } })
    }
    dispatch({ type: "CLEAR_STATUS" })
  }
}

export const cancelOrder = (orderId, customerId) => {
  return async dispatch => {
    dispatch({ type: "SEND" })
    try {
      await cancel(orderId, customerId)
      dispatch({ type: "SUCCESS" })
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: `${error}` } })
    }
    dispatch({ type: "CLEAR_STATUS" })
  }
}
export const registerShop = data => {
  return async dispatch => {
    dispatch({ type: "SEND" })
    try {
      await createShop(data)
      dispatch({ type: "SUCCESS" })
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: `${error}` } })
    }
    dispatch({ type: "CLEAR_STATUS" })
  }
}
export const getShopDetail = shopId => {
  return async dispatch => {
    dispatch({ type: "SEND" })
    try {
      const response = await getShopById(shopId)
      dispatch({
        type: "INITIAL_SHOP",
        payload: {
          shopDetail: response,
        },
      })
      dispatch({ type: "SUCCESS" })
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } })
    }
    dispatch({ type: "CLEAR_STATUS" })
  }
}

export const updateInfomationShop = data => {
  return async dispatch => {
    dispatch({ type: "SEND" })
    try {
      await updateShop(data)
      dispatch({ type: "SUCCESS" })
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } })
    }

    dispatch({ type: "CLEAR_STATUS" })
  }
}

export const createNewItem = data => {
  return async dispatch => {
    dispatch({ type: "SEND" })
    try {
      await createItem(data)
      dispatch({ type: "SUCCESS" })
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } })
    }

    dispatch({ type: "CLEAR_STATUS" })
  }
}

export const updateInfomationItem = data => {
  return async dispatch => {
    dispatch({ type: "SEND" })
    try {
      await updateItem(data)
      dispatch({ type: "SUCCESS" })
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } })
    }

    dispatch({ type: "CLEAR_STATUS" })
  }
}

export const activeThisItem = (shopId, itemId) => {
  return async dispatch => {
    dispatch({ type: "SEND" })
    try {
      await activeItem(shopId, itemId)
      dispatch({ type: "SUCCESS" })
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } })
    }

    dispatch({ type: "CLEAR_STATUS" })
  }
}

export const deleteThisItem = (shopId, itemId) => {
  return async dispatch => {
    dispatch({ type: "SEND" })
    try {
      await deleteItem(shopId, itemId)
      dispatch({ type: "SUCCESS" })
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } })
    }

    dispatch({ type: "CLEAR_STATUS" })
  }
}
