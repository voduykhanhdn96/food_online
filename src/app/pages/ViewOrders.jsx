import { AgGridReact } from "ag-grid-react"
import { useMemo, useRef } from "react"
import ActionCellRenderer from "./ViewOrders/ActionCellRenderer"
import StatusCellRenderer from "./ViewOrders/StatusCellRenderer"
import OrderDetailModal from "./ViewOrders/OrderDetailModal"
import SectionHeader from "../components/SectionHeader"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getListOrder, getShopDetail } from "../store/actions/admin-action"
// import { formatCurrency } from "./../helpers/number-helper"

const ViewOrders = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const order = useSelector(state => state.admin.orderList)
  // never changes, so we can use useMemo
  const columnDefs = useMemo(
    () => [
      { field: "orderId", pinned: "left" },
      { field: "customerName" },
      { field: "customerPhoneNumber" },
      { field: "totalPrice" },
      { field: "status", cellRenderer: "statusCellRenderer" },
      { field: "orderTime", sort: "desc" },
      {
        field: "action",
        pinned: "right",
        cellRenderer: "actionCellRenderer",
        cellRendererParams: {
          onViewOrder: orderId => viewOrder(orderId),
        },
      },
    ],
    []
  )

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  )

  useEffect(() => {
    dispatch(getShopDetail(auth.shopId))
  }, [auth, dispatch])

  useEffect(() => {
    dispatch(getListOrder(auth.shopId))
  }, [dispatch, auth.shopId])

  // changes, needs to be state
  const gridHeight = window.innerHeight

  const modalRef = useRef(null)

  const viewOrder = id => {
    modalRef.current.open(id)
  }

  return (
    <>
      <SectionHeader title="View Orders"></SectionHeader>
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
          rowData={order}
          frameworkComponents={{
            actionCellRenderer: ActionCellRenderer,
            statusCellRenderer: StatusCellRenderer,
          }}
        />
      </div>
      <OrderDetailModal listOrder={order} ref={modalRef}></OrderDetailModal>
    </>
  )
}

export default ViewOrders