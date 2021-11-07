import { useRef } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Button, Image, Popup, Segment } from "semantic-ui-react"
import StoreInformation from "../StoreInformation"
import ModifyStoreModal from "./RightSideBar/ModifyStoreModal"
import ShareModal from "./RightSideBar/ShareModal"
import { APP_URL } from "./../../../env"

const RightSideBar = () => {
  const param = useParams()
  const modalRef = useRef(null)
  const shareRef = useRef(null)
  const shopInfo = useSelector(state => state.admin.shop)

  const id = param.shopId

  const { image, name, phoneNumber } = shopInfo

  const viewShopProfile = id => {
    modalRef.current.open(id)
  }

  const share = () => {
    shareRef.current.open(`${APP_URL}/store/` + id)
  }

  const copy = e => {
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <Segment color="red" as="div" className="admin-layout_side-bar">
      <Image
        src={
          image
            ? `data:image/jpeg;base64,${image}`
            : "https://dummyimage.com/900x900/ecf0f1/aaa"
        }
        fluid
        rounded
        onClick={viewShopProfile}
        target="_blank"
      />

      <StoreInformation
        icon="home"
        title="Name"
        label={name}
      ></StoreInformation>
      <StoreInformation
        icon="phone"
        title="Phone Number"
        label={phoneNumber}
      ></StoreInformation>

      <Button
        basic
        size={"tiny"}
        content="Share"
        labelPosition="left"
        icon="share alternate"
        onClick={share}
        color="green"
        style={{ marginTop: 15, width: "100%" }}
      />

      <Popup
        content="Copied !"
        onMount={copy}
        on="click"
        trigger={
          <Button
            basic
            size={"tiny"}
            content="Copy Link"
            labelPosition="left"
            icon="linkify"
            color="brown"
            style={{ marginTop: 15, width: "100%" }}
          />
        }
      />

      <Button
        basic
        size={"tiny"}
        content="Edit Profile"
        labelPosition="left"
        icon="briefcase"
        onClick={viewShopProfile}
        color="blue"
        style={{ marginTop: 15, width: "100%" }}
      />

      <ModifyStoreModal shopId={id} shopInfo={shopInfo} ref={modalRef} />
      <ShareModal ref={shareRef} />
    </Segment>
  )
}

export default RightSideBar
