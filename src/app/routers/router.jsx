import { BrowserRouter, Switch, Route } from "react-router-dom"

import { Redirect } from "react-router"
import AdminLayoutRoute from "./../layouts/AdminLayout"
import CustomerLayout from "./../layouts/CustomerLayout"
import NotFound from "./../pages/404"
import ViewOrders from "../pages/ViewOrders"
import ViewMenu from "./../pages/ViewMenu"
import Stores from "../pages/Stores"
import Store from "../pages/Store"
import BlankLayout from "./../layouts/BlankLayout"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import { useSelector } from "react-redux"
import OrderDetail from "../pages/Orders/OrderDetail"
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
          {auth.customerId && <CustomerLayout component={Store} />}
          {!auth.customerId && <BlankLayout component={SignIn} />}
        </Route>
        <Route path="/store/:shopId" exact>
          {auth.customerId && <CustomerLayout component={Store} />}
          {!auth.customerId && <BlankLayout component={SignIn} />}
        </Route>
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
        <CustomerLayout exact path="/stores" component={Stores} />
        <CustomerLayout exact path="/orders" component={Orders} />
        <CustomerLayout exact path="/order/:orderId" component={OrderDetail} />
        <CustomerLayout exact path="/store/:shopId" component={Store} />
        <CustomerLayout exact path="/cart/:cartId" component={Store} />
        <BlankLayout exact path="/sign-in" component={SignIn} />
        <BlankLayout exact path="/sign-up" component={SignUp} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
