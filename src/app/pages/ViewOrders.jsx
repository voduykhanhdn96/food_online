import { AgGridReact } from "ag-grid-react"
import { useMemo, useRef } from "react"
import ActionCellRenderer from "../components/ViewOrders/ActionCellRenderer"
import StatusCellRenderer from "../components/ViewOrders/StatusCellRenderer"
import OrderDetailModal from "../components/ViewOrders/OrderDetailModal"
import SectionHeader from "../components/SectionHeader"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getListOrder, getShopDetail } from "../store/actions/admin-action"
import { useParams } from "react-router-dom"
import { LogLevel, HubConnectionBuilder } from "@microsoft/signalr"
import { useCallback } from "react"
import { Segment } from "semantic-ui-react"
import { SIGNALR_HUB_URL } from "./../../env"

const ViewOrders = () => {
  const dispatch = useDispatch()
  const param = useParams()
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

  const startCons = useCallback(async () => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${SIGNALR_HUB_URL}/shop?shop=` + param.shopId, {
        withCredentials: false,
      })
      .configureLogging(LogLevel.Information)
      .build()

    try {
      await connection.start()
    } catch (e) {
      console.log(e)
    }

    connection.on("NewOrder", message => {
      dispatch(getListOrder(param.shopId))
    })
  }, [dispatch, param.shopId])

  useEffect(() => {
    startCons()
  }, [startCons])

  useEffect(() => {
    dispatch(getShopDetail(param.shopId))
  }, [param.shopId, dispatch])

  useEffect(() => {
    dispatch(getListOrder(param.shopId))
  }, [dispatch, param.shopId])

  // changes, needs to be state
  const gridHeight = window.innerHeight

  const modalRef = useRef(null)

  const viewOrder = id => {
    modalRef.current.open(id)
  }

  return (
    <>
      <SectionHeader title="View Orders"></SectionHeader>

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
            rowData={order}
            frameworkComponents={{
              actionCellRenderer: ActionCellRenderer,
              statusCellRenderer: StatusCellRenderer,
            }}
          />
        </div>
      </Segment>

      <OrderDetailModal listOrder={order} ref={modalRef}></OrderDetailModal>
    </>
  )
}

export default ViewOrders
