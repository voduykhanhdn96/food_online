import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Image, Popup } from "semantic-ui-react";
import StoreInforField from "../../components/StoreInforField";
import ModifyStoreModal from "./RightSideBar/ModifyStoreModal";
import ShareModal from "./RightSideBar/ShareModal";

const RightSideBar = () => {
  const param = useParams();
  const modalRef = useRef(null);
  const shareRef = useRef(null);
  const shopInfo = useSelector((state) => state.admin.shop);

  const id = param.shopId;

  const { image, name, phoneNumber } = shopInfo;

  const viewShopProfile = (id) => {
    modalRef.current.open(id);
  };

  const share = () => {
    shareRef.current.open("http://localhost:3000/store/" + id);
  };

  const copy = (e) => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="admin-layout_side-bar">
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

      <StoreInforField
        icon="linkify"
        title="Link"
        label={`/admin/` + id + `/view-menu`}
      ></StoreInforField>
      <StoreInforField icon="hashtag" title="ID" label={id}></StoreInforField>
      <StoreInforField icon="home" title="Name" label={name}></StoreInforField>
      <StoreInforField
        icon="phone"
        title="Phone Number"
        label={phoneNumber}
      ></StoreInforField>

      <Button
        basic
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
        content="Edit Profile"
        labelPosition="left"
        icon="briefcase"
        onClick={viewShopProfile}
        color="blue"
        style={{ marginTop: 15, width: "100%" }}
      />

      <ModifyStoreModal shopId={id} shopInfo={shopInfo} ref={modalRef} />
      <ShareModal ref={shareRef} />
    </div>
  );
};

export default RightSideBar;
