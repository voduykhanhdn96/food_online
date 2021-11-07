import { useCallback, useState } from "react"
import StoreList from "../components/StoreList"
import { useDispatch } from "react-redux"
import { fetchAllShop } from "../store/actions/shop-action"
import { useEffect } from "react"
import { Segment } from "semantic-ui-react"

const Stores = () => {
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
    <Segment raised className="store-list">
      {storeList && <StoreList stores={storeList}></StoreList>}
    </Segment>
  )
}

export default Stores
