import { useState } from "react"
import { useMemo } from "react"
import { useCallback } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrder } from "../store/actions/shop-action"
import ActionCellRenderer from "../components/ViewOrders/ActionCellRenderer"
import StatusCellRenderer from "../components/ViewOrders/StatusCellRenderer"
import { Segment } from "semantic-ui-react"
import { useHistory } from "react-router-dom"
import { AgGridReact } from "ag-grid-react"

const Order = () => {
  const authUser = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()
  const [listOrder, setListOrder] = useState([])

  const fetchListOrder = useCallback(async () => {
    const response = await dispatch(fetchOrder(authUser.customerId))
    setListOrder(response)
  }, [authUser.customerId, dispatch])

  const viewOrder = useCallback(
    id => {
      history.push("/order/" + id)
    },
    [history]
  )

  useEffect(() => {
    fetchListOrder()
  }, [fetchListOrder])
  // never changes, so we can use useMemo
  const columnDefs = useMemo(
    () => [
      { field: "orderId", pinned: "left" },
      { field: "shopName" },
      { field: "phoneNumberOfShop" },
      { field: "totalPrice" },
      { field: "orderTime", sort: "desc" },
      { field: "status", cellRenderer: "statusCellRenderer" },
      {
        field: "action",
        pinned: "right",
        cellRenderer: "actionCellRenderer",
        cellRendererParams: {
          onViewOrder: orderId => viewOrder(orderId),
        },
      },
    ],
    [viewOrder]
  )

  // changes, needs to be state
  const gridHeight = window.innerHeight

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  )

  return (
    <>
      <Segment color="red" raised>
        <div
          className="ag-theme-material grid-order"
          style={{ height: gridHeight - 150 }}
        >
          <AgGridReact
            reactUi="true"
            className="ag-theme-material"
            animateRows="true"
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowData={listOrder.orders}
            frameworkComponents={{
              actionCellRenderer: ActionCellRenderer,
              statusCellRenderer: StatusCellRenderer,
            }}
          />
        </div>
      </Segment>
    </>
  )
}

export default Order
