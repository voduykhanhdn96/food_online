import { useState } from "react"
import { useHistory } from "react-router"
import { useParams } from "react-router-dom"
import { Icon, Image, Menu } from "semantic-ui-react"

const HeaderAdmin = () => {
  const param = useParams()
  const history = useHistory()
  const [activeItem] = useState(null)

  return (
    <Menu className="header" stackable>
      <Menu.Item
        onClick={() => history.push("/admin/" + param.shopId + "/view-menu")}
      >
        <Image src="/logo/logo32.png" />
      </Menu.Item>

      {/* <Menu.Item
        name="profile"
        active={activeItem === "profile"}
        onClick={() => history.push("/admin/" + param.shopId + "/profile")}
      >
        <Icon size={"small"} name="user" /> Profile
      </Menu.Item> */}

      <Menu.Item
        name="logoff"
        active={activeItem === "logoff"}
        onClick={() => history.push("/sign-in")}
      >
        <Icon size={"small"} name="log out" /> Sign Out
      </Menu.Item>
    </Menu>
  )
}

export default HeaderAdmin
