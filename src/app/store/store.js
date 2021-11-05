import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"

import authReducer from "./reducers/auth-reducer"
import notificationReducer from "./reducers/notification-reducer"
import adminReducer from "./reducers/admin-reducer"
import shopReducer from "./reducers/shop-reducer"

const configureStore = (initialState = {}) => {
  const reducer = combineReducers({
    auth: authReducer,
    shop: shopReducer,
    admin: adminReducer,
    notification: notificationReducer,
  })

  return createStore(reducer, initialState, applyMiddleware(thunk))
}

export default configureStore
