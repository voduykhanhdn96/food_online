import { forwardRef, useImperativeHandle, useState } from "react"
import { Button, Modal, Form } from "semantic-ui-react"
import ViewContent from "./ViewContent"
import { useDispatch } from "react-redux"
import { newOrder } from "../../store/actions/shop-action"
import useToast from "../../hooks/useToast"

const CheckOutModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false)
  const [infomation, setInfomation] = useState(null)

  const { toastSuccess, toastError } = useToast()

  const dispatch = useDispatch()
  useImperativeHandle(ref, () => ({
    open() {
      setOpen(true)
    },
  }))

  const checkout = async () => {
    const data = await dispatch(newOrder(props.cartId, infomation))
    if (data.errorMessage) {
      toastError(data.errorMessage)
    } else if (data.errors) {
      toastError(data.title)
    } else {
      toastSuccess("Order is success !")
    }
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      style={{
        margin: 0,
      }}
    >
      <Modal.Header>Check Out</Modal.Header>
      <Modal.Content image>
        <ViewContent groups={props.groups} totalPrice={props.totalPrice} />
      </Modal.Content>
      <Modal.Content>
        <Form size={"small"}>
          <Form.Field>
            <label>Input infomation</label>
            <textarea
              onChange={e => {
                setInfomation(e.target.value)
              }}
              placeholder="Input infomation"
            />
          </Form.Field>
        </Form>
      </Modal.Content>

      <Modal.Actions>
        <Button
          size={"tiny"}
          content="Continue Shopping"
          labelPosition="right"
          icon="shop"
          onClick={() => setOpen(false)}
        />

        <Button
          content="Check Out"
          labelPosition="right"
          icon="arrow right"
          onClick={checkout}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
})

export default CheckOutModal
