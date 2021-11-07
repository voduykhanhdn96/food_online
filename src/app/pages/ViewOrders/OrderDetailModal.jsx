import { forwardRef, useImperativeHandle, useMemo, useState } from "react"
import { Button, Grid, Modal, Dropdown } from "semantic-ui-react"
import dayjs from "dayjs"
import { AgGridReact } from "ag-grid-react/lib/agGridReact"
import OrderInforField from "./../../components/OrderInforField"
import { useDispatch, useSelector } from "react-redux"
import {
  changeStatusOrder,
  cancelOrder,
} from "../../store/actions/admin-action"
import useToast from "../../hooks/useToast"
import { useHistory } from "react-router-dom"
import { useEffect } from "react"
const options = [
  { key: 1, text: "Confirmed", value: "Confirmed" },
  { key: 2, text: "Sent To Kitchen", value: "Sent To Kitchen" },
  { key: 3, text: "Ready for Pickup", value: "Ready for Pickup" },
]

const OrderDetailModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isChangeStatus, setIsChangeStatus] = useState(false)
  const [order, setOrder] = useState([])
  const notification = useSelector(state => state.notification)
  const { toastError } = useToast()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isChangeStatus) {
      if (notification.status === "completed" && !notification.error) {
        history.go(0)
      }
      if (notification.status === "completed" && notification.error) {
        toastError(notification.error)
        setIsChangeStatus(false)
      }
    }
  }, [history, isChangeStatus, notification.error, notification, toastError])

  useImperativeHandle(ref, () => ({
    open(id) {
      setIsOpen(true)
      const orderTemp = props.listOrder
        .filter(item => item.orderId === id)
        .map(filteredItem => {
          return filteredItem
        })
      setOrder(orderTemp[0])
    },
  }))

  const columnDefs = useMemo(
    () => [
      { field: "customerName", minWidth: 100 },
      { field: "price" },
      { field: "amount" },
      { field: "price" },
    ],
    []
  )

  const defaultColDef = useMemo(
    () => ({
      resizable: false,
      sortable: true,
    }),
    []
  )

  const {
    orderId,
    status,
    customerId,
    customerName,
    customerPhoneNumber,
    itemsInCart,
    orderTime,
    shopId,
  } = order

  const changeStatus = (e, data) => {
    setIsChangeStatus(true)
    dispatch(changeStatusOrder(orderId, data.value, customerId, shopId))
  }

  const deliverOrder = () => {
    setIsChangeStatus(true)
    dispatch(changeStatusOrder(orderId, "Delivered", customerId, shopId))
  }

  const cancelledOrder = () => {
    setIsChangeStatus(true)
    dispatch(cancelOrder(orderId, customerId))
  }

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      <Modal.Header>{`Order #${orderId}`}</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <div className="order-info">
            <Grid container>
              <Grid.Column width={2}>
                <OrderInforField
                  title="Order No"
                  label={orderId}
                ></OrderInforField>
              </Grid.Column>
              <Grid.Column width={3}>
                <OrderInforField
                  title="Order Time"
                  label={dayjs(orderTime).format("MM/DD/YYYY HH:mm")}
                ></OrderInforField>
              </Grid.Column>
              <Grid.Column width={2}>
                <OrderInforField
                  title="Customer Name"
                  label={customerName}
                ></OrderInforField>
              </Grid.Column>
              <Grid.Column width={2}>
                <OrderInforField
                  title="Customer Phone"
                  label={customerPhoneNumber}
                ></OrderInforField>
              </Grid.Column>
              <Grid.Column width={3}>
                <div className="info-field">
                  <h5>Change Status</h5>
                  <Dropdown
                    search
                    selection
                    defaultValue={status}
                    wrapSelection={false}
                    onChange={changeStatus}
                    options={options}
                    placeholder="Choose an option"
                  />
                </div>
              </Grid.Column>
            </Grid>
          </div>
          <div
            className="order-items ag-theme-material"
            style={{ height: 240 }}
          >
            <AgGridReact
              reactUi="true"
              className="ag-theme-material"
              animateRows="true"
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              enableRangeSelection="true"
              rowData={itemsInCart}
              rowSelection="multiple"
              suppressRowClickSelection="true"
            />
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button size={"tiny"} color="black" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button
          size={"tiny"}
          content="Cancel Order"
          labelPosition="left"
          icon="close"
          onClick={cancelledOrder}
          color="red"
        />
        <Button
          size={"tiny"}
          onClick={deliverOrder}
          content="Complete Order"
          labelPosition="right"
          icon="checkmark"
          positive
        />
      </Modal.Actions>
    </Modal>
  )
})

export default OrderDetailModal
