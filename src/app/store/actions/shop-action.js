import {
  createCart,
  existCartCustomerWithShop,
  getCartData,
  addItem,
  submitItem,
  removeItem,
  unSubmitItem,
} from "../../lib/api_cart";
import { createCustomer } from "../../lib/api_customer";
import { getAllShop } from "../../lib/api_shop";
import { createOrder, getAllOrder, getOrder } from "../../lib/api_order";

export const takeOrder = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: "SEND" });
    try {
      const response = await getOrder(orderId);
      await dispatch({
        type: "INITIAL_ORDER",
        payload: {
          order: response,
        },
      });
      dispatch({
        type: "SETTING_GROUP",
        payload: { itemsInCart: response.itemsInCart },
      });

      dispatch({ type: "SUCCESS" });
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } });
    }
    dispatch({ type: "CLEAR_STATUS" });
  };
};

export const newOrder = (cartId, infomation) => {
  return async (dispatch) => {
    try {
      const data = await createOrder(cartId, infomation);
      return data;
    } catch (error) {}
  };
};

export const fetchOrder = (customerId) => {
  return async (dispatch) => {
    dispatch({ type: "SEND" });
    try {
      const data = await getAllOrder(customerId);
      dispatch({ type: "CLEAR_STATUS" });
      return data;
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } });
    }
  };
};

export const registerCustomer = (data) => {
  return async (dispatch) => {
    dispatch({ type: "SEND" });
    try {
      await createCustomer(data);
      dispatch({ type: "SUCCESS" });
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } });
    }
    dispatch({ type: "CLEAR_STATUS" });
  };
};
export const submitItemOfCustomer = (items, customerId, cartId) => {
  return async (dispatch) => {
    dispatch({ type: "SEND" });
    try {
      await submitItem(items, customerId, cartId);
      await dispatch(initialCartData(cartId));
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } });
    }
  };
};
export const unSubmitItemOfCustomer = (customerId, cartId) => {
  return async (dispatch) => {
    dispatch({ type: "SEND" });
    try {
      await unSubmitItem(customerId, cartId);
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } });
    }
  };
};
export const addItemToCart = (customerId, itemId, cartId) => {
  return async (dispatch) => {
    dispatch({ type: "SEND" });
    try {
      await addItem(customerId, itemId, cartId);
      // await dispatch(initialCartData(cartId))
      // dispatch({ type: "SUCCESS" })
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: { errorMessage: "" + error.message },
      });
    }
    // dispatch({ type: "CLEAR_STATUS" })
  };
};

export const removeItemFromCart = (customerId, itemId, cartId) => {
  return async (dispatch) => {
    dispatch({ type: "SEND" });
    try {
      await removeItem(customerId, itemId, cartId);
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } });
    }
  };
};

export const fetchAllShop = () => {
  return async (dispatch) => {
    dispatch({ type: "SEND" });
    try {
      const response = await getAllShop();
      return response;
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } });
    }
    dispatch({ type: "CLEAR_STATUS" });
  };
};

export const checkExistCartCustomerWithShop = (customerId, shopId) => {
  return async (dispatch) => {
    dispatch({ type: "SEND" });
    try {
      const responseCheckCart = await existCartCustomerWithShop(
        customerId,
        shopId
      );

      if (responseCheckCart.status === 204) {
        const responseRegist = await dispatch(registerCart(customerId, shopId));
        dispatch(initialCartData(responseRegist.cartId));
      } else {
        const data = await responseCheckCart.json();
        dispatch(initialCartData(data.cartId));
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } });
    }
  };
};

export const initialCartData = (cartId) => {
  return async (dispatch) => {
    dispatch({ type: "SEND" });
    try {
      const response = await getCartData(cartId);
      dispatch({
        type: "INITIAL_CART",
        payload: {
          cart: response,
        },
      });
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } });
    }
    dispatch({ type: "CLEAR_STATUS" });
  };
};

export const registerCart = (customerId, shopId) => {
  return async (dispatch) => {
    try {
      const response = await createCart(customerId, shopId);
      return response;
    } catch (error) {
      dispatch({ type: "ERROR", payload: { errorMessage: error.message } });
    }
    dispatch({ type: "CLEAR_STATUS" });
  };
};
