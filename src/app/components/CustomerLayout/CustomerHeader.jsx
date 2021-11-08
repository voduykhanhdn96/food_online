import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { Icon, Image, Menu } from "semantic-ui-react"
import { logoutAction } from "../../store/actions/auth-action"

const CustomerHeader = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [activeItem] = useState(null)

  const logout = () => {
    dispatch(logoutAction())
    history.push("/")
  }
  return (
    <Menu className="header" secondary size="small">
      <Menu.Item onClick={() => history.push("/stores")}>
        <Image src="/logo32.png" />
      </Menu.Item>

      <Menu.Item
        name="Stores"
        active={activeItem === "Stores"}
        onClick={() => history.push("/stores")}
      >
        Stores
      </Menu.Item>

      <Menu.Item
        name="Profile"
        active={activeItem === "Profile"}
        onClick={() => history.push("/orders")}
      >
        Your Orders
      </Menu.Item>

      <Menu.Item
        name="logoff"
        position="right"
        active={activeItem === "logoff"}
        onClick={logout}
      >
        <Icon size={"small"} name="log out" /> Sign Out
      </Menu.Item>
    </Menu>
  )
}

export default CustomerHeader
