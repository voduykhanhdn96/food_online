import { BrowserRouter, Switch, Route } from "react-router-dom"

import { Redirect } from "react-router"
import AdminLayoutRoute from "./../layouts/AdminLayout"
import CustomerLayout from "./../layouts/CustomerLayout"
import NotFound from "./../pages/404"
import ViewOrders from "../pages/ViewOrders"
import ViewMenu from "./../pages/ViewMenu"
import Stores from "../pages/Stores"
import StoreDetail from "../pages/StoreDetail"
import BlankLayout from "./../layouts/BlankLayout"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import { useSelector } from "react-redux"
import OrderDetail from "../pages/OrderDetail"
import Orders from "../pages/Orders"

const Router = () => {
  const auth = useSelector(state => state.auth)
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {auth.customerId && <Redirect to="/stores" />}
          {!auth.customerId && <Redirect to="/sign-in" />}
        </Route>
        <Route path="/cart/:cartId" exact>
          {auth.customerId && <CustomerLayout component={StoreDetail} />}
          {!auth.customerId && <BlankLayout component={SignIn} />}
        </Route>
        <Route path="/store/:shopId" exact>
          {auth.customerId && <CustomerLayout component={StoreDetail} />}
          {!auth.customerId && <BlankLayout component={SignIn} />}
        </Route>
        <CustomerLayout exact path="/stores" component={Stores} />
        <CustomerLayout exact path="/orders" component={Orders} />
        <CustomerLayout exact path="/order/:orderId" component={OrderDetail} />
        <CustomerLayout exact path="/store/:shopId" component={StoreDetail} />
        <CustomerLayout exact path="/cart/:cartId" component={StoreDetail} />

        <BlankLayout exact path="/sign-in" component={SignIn} />
        <BlankLayout exact path="/sign-up" component={SignUp} />

        <AdminLayoutRoute
          exact
          path="/admin/:shopId/view-orders"
          component={ViewOrders}
        />
        <AdminLayoutRoute
          exact
          path="/admin/:shopId/view-menu"
          component={ViewMenu}
        />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
