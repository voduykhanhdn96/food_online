import MenuDetailModal from "./ViewMenu/MenuDetailModal"
import MenuItemList from "../components/MenuItemList"
import SectionHeader from "../components/SectionHeader"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getShopDetail } from "../store/actions/admin-action"
import { useParams } from "react-router-dom"
import Loader from "../components/Loader"

const ViewMenu = () => {
  const param = useParams()
  const shopDetail = useSelector(state => state.admin.shop)
  const notification = useSelector(state => state.notification)

  const dispatch = useDispatch()
  const modalRef = useRef(null)

  const viewDetail = id => {
    modalRef.current.open(id)
  }

  const addItem = () => {
    modalRef.current.open()
  }

  useEffect(() => {
    dispatch(getShopDetail(param.shopId))
  }, [param, dispatch])

  return (
    <>
      <SectionHeader
        title="View Menu"
        addItem={() => addItem()}
      ></SectionHeader>
      {notification.status === "pending" && <Loader />}
      {shopDetail.items && (
        <MenuItemList
          items={shopDetail.items}
          viewDetail={viewDetail}
        ></MenuItemList>
      )}

      <MenuDetailModal
        items={shopDetail.items}
        ref={modalRef}
      ></MenuDetailModal>
    </>
  )
}

export default ViewMenu
