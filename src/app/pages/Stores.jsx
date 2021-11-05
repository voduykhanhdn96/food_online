import { useCallback, useState } from "react"
import StoreList from "../components/StoreList"
import { useDispatch } from "react-redux"
import { fetchAllShop } from "../store/actions/shop-action"
import { useEffect } from "react"

const DashboardGuest = () => {
  const [storeList, setStoreList] = useState([])
  const dispatch = useDispatch()

  const loadShop = useCallback(async () => {
    const response = await dispatch(fetchAllShop())
    setStoreList(response)
  }, [dispatch])

  useEffect(() => {
    loadShop()
  }, [loadShop])

  return (
    <>
      <div className="store-search"></div>
      <div className="store-list">
        {storeList && <StoreList stores={storeList}></StoreList>}
      </div>
    </>
  )
}

export default DashboardGuest
