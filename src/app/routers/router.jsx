import { BrowserRouter, Switch, Route } from "react-router-dom"

import { Redirect } from "react-router"
import AdminLayoutRoute from "./../layouts/AdminLayout"
import CustomerLayoutRoute from "./../layouts/CustomerLayout"
import NotFound from "./../pages/404"
import ViewOrders from "../pages/ViewOrders"
import ViewMenu from "./../pages/ViewMenu"
import Stores from "../pages/Stores"
import Store from "../pages/Store"
import DefaultLayoutRoute from "./../layouts/DefaultLayout"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import { useSelector } from "react-redux"
import OrderDetail from "../pages/OrderDetail"
import Order from "../pages/Order"

const Router = () => {
  const auth = useSelector(state => state.auth)
  console.log(auth.customerId)
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {auth.customerId && <Redirect to="/store" />}
          {!auth.customerId && <Redirect to="/sign-in" />}
        </Route>
        <Route path="/cart/:cartId" exact>
          {auth.customerId && <CustomerLayoutRoute component={Store} />}
          {!auth.customerId && <DefaultLayoutRoute component={SignIn} />}
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
        <CustomerLayoutRoute exact path="/store" component={Stores} />
        <CustomerLayoutRoute exact path="/order" component={Order} />
        <CustomerLayoutRoute
          exact
          path="/order/:orderId"
          component={OrderDetail}
        />
        <CustomerLayoutRoute exact path="/store/:shopId" component={Store} />
        <CustomerLayoutRoute exact path="/cart/:cartId" component={Store} />
        <DefaultLayoutRoute exact path="/sign-in" component={SignIn} />
        <DefaultLayoutRoute exact path="/sign-up" component={SignUp} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
