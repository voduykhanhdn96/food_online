import { Icon, Menu } from "semantic-ui-react"
import { Link, useParams } from "react-router-dom"

const LeftSideBar = () => {
  const param = useParams()

  return (
    <div className="admin-layout_menu">
      <Menu vertical color="red">
        <Menu.Item name="orders" color="red">
          <Link to={`/admin/${param.shopId}/view-orders`}>
            <Icon name="list" /> Orders
          </Link>
        </Menu.Item>

        <Menu.Item name="menu" color="red">
          <Link to={`/admin/${param.shopId}/view-menu`}>
            <Icon name="list alternate outline" /> Menu
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default LeftSideBar
