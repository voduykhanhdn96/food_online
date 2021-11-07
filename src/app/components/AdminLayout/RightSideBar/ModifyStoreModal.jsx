import { Modal, Button, Image, Form, Icon, Label } from "semantic-ui-react"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import {
  updateInfomationShop,
  getShopDetail,
} from "../../../store/actions/admin-action"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import useToast from "../../../hooks/useToast"

const ModifyStoreModal = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const inputFileRef = useRef(null)
  const { toastSuccess, toastError, toastInfo } = useToast()
  const notification = useSelector(state => state.notification)

  const [isOpen, setIsOpen] = useState(false)
  const [isClickUpd, setIsClickUpd] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [newName, setNewName] = useState(null)
  const [imageLoad, setImageLoad] = useState(null)
  const [newPhoneNumber, setNewPhoneNumber] = useState(null)

  const id = props.shopId
  const { image, name, phoneNumber } = props.shopInfo

  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true)

      setNewName(name)
      setNewPhoneNumber(phoneNumber)

      if (image) {
        const url = `data:image/png;base64,${image}`

        fetch(url)
          .then(res => res.blob())
          .then(response => {
            setImageLoad(URL.createObjectURL(response))
          })
      }
    },
  }))

  const chooseFile = e => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setImageLoad(URL.createObjectURL(e.target.files[0]))
    }
  }
  const requestChooseFile = () => {
    inputFileRef.current.click()
  }

  const editProfile = () => {
    var formData = new FormData()
    formData.append("Name", newName)
    formData.append("PhoneNumber", phoneNumber)
    if (phoneNumber !== newPhoneNumber) {
      formData.append("NewPhoneNumber", newPhoneNumber)
    }
    formData.append("Logo", selectedFile)

    dispatch(updateInfomationShop(formData))
    setIsClickUpd(true)
  }

  useEffect(() => {
    if (isClickUpd) {
      if (notification.status === "completed" && !notification.error) {
        toastSuccess("Update is success !")
        dispatch(getShopDetail(id))
        setIsOpen(false)
        setIsClickUpd(false)
      }
      if (notification.status === "completed" && notification.error) {
        toastError("Update is wrong !")
        setIsClickUpd(false)
      }
    }
  }, [
    isClickUpd,
    notification,
    id,
    dispatch,
    toastSuccess,
    toastError,
    toastInfo,
  ])

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      className="store-modify-modal"
    >
      <Modal.Header>Modify Store Information</Modal.Header>
      <Modal.Content image>
        <Image
          rounded
          fluid
          src={imageLoad || "https://dummyimage.com/900x900/ecf0f1/aaa"}
          wrapped
        />
        <Modal.Description>
          <Form size={"small"}>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Name"
                value={newName}
                onChange={e => {
                  setNewName(e.target.value)
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Phone Number</label>
              <input
                placeholder="Phone"
                value={newPhoneNumber}
                onChange={e => {
                  setNewPhoneNumber(e.target.value)
                }}
              />
            </Form.Field>
            <Form.Field>
              <Button
                size={"tiny"}
                as="div"
                labelPosition="right"
                onClick={requestChooseFile}
              >
                <Button>
                  <Icon name="upload" />
                  Upload File
                </Button>
                <Label basic pointing="left">
                  {imageLoad || "Please select image"}
                </Label>
              </Button>
              <input
                style={{ display: "none" }}
                type="file"
                ref={inputFileRef}
                onChange={chooseFile}
                accept="image/*"
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setIsOpen(false)}>
          Close
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={editProfile}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
})

export default ModifyStoreModal
