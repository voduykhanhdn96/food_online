import { useHistory } from "react-router"
import { useState, useRef, useEffect } from "react"
import useToast from "./../hooks/useToast"
import {
  Button,
  Image,
  Form,
  Grid,
  Segment,
  Container,
  Divider,
  Label,
  Icon,
} from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux"
import { registerShop } from "../store/actions/admin-action"
import { registerCustomer } from "../store/actions/shop-action"

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const { toastSuccess, toastInfo } = useToast()

  const refName = useRef()
  const refPhoneNumber = useRef()

  const [isClickReg, setIsClickReg] = useState(false)
  const [isShop, setIsShop] = useState(true)

  const signIn = () => {
    history.push("/sign-in")
  }

  const toggleView = () => {
    setIsShop(!isShop)
  }

  const submit = () => {
    setIsClickReg(true)
    // Validate

    // submit
    var formData = new FormData()
    formData.append("Name", refName.current.value)
    formData.append("PhoneNumber", refPhoneNumber.current.value)
    if (isShop) {
      dispatch(registerShop(formData))
    } else {
      dispatch(registerCustomer(formData))
    }
  }

  useEffect(() => {
    if (isClickReg) {
      if (notification.status === "completed" && !notification.error) {
        toastSuccess("Register is success !")
        history.push("/sign-in")
      }
      if (notification.status === "completed" && notification.error) {
        toastInfo(notification.error)
        setIsClickReg(false)
      }
    }
  }, [history, notification, isShop, toastInfo, toastSuccess, isClickReg])

  const label = isShop
    ? "Register as a customer?"
    : "Register as a store owner?"
  const labelName = isShop ? "Shop Name" : "Customer Name"

  return (
    <Container className="auth-form">
      <Image src="/logo/logo64.png" centered />
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={6}>
          <Segment raised>
            <Label as="a" style={{ width: "100%" }} onClick={toggleView}>
              <Icon name="question circle" /> {label}
            </Label>
            <Divider />

            <Form>
              <Form.Field>
                <label>{labelName}</label>
                <input ref={refName} placeholder={labelName} />
              </Form.Field>
              <Form.Field>
                <label>Phone Number</label>
                <input ref={refPhoneNumber} placeholder="Phone Number" />
              </Form.Field>
              <Button type="submit" color="green" fluid onClick={submit}>
                Register
              </Button>
            </Form>

            <Divider />
            <Label
              as="a"
              basic
              style={{ width: "100%" }}
              color="grey"
              onClick={signIn}
            >
              <Icon name="user" /> Already a member. Sign In
            </Label>
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </Container>
  )
}

export default Login
