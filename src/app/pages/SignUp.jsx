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
import { loginAction } from "../store/actions/auth-action"

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const authUser = useSelector(state => state.auth)

  const { toastSuccess, toastInfo } = useToast()

  const refName = useRef()
  const refPhoneNumber = useRef()

  const [isClickReg, setIsClickReg] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isShop, setIsShop] = useState(true)

  const signIn = () => {
    history.push("/sign-in")
  }

  const toggleView = () => {
    setIsShop(!isShop)
  }

  const submit = () => {
    setIsClickReg(true)

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
        if (isShop) {
          dispatch(loginAction(refPhoneNumber.current.value, "SHOP"))
        } else {
          dispatch(loginAction(refPhoneNumber.current.value, "USER"))
        }
        setIsLogin(true)
        // history.push("/sign-in");
        setIsClickReg(false)
      }
      if (notification.status === "completed" && notification.error) {
        toastInfo(notification.error)
        setIsClickReg(false)
      }
    }
    if (isLogin) {
      if (notification.status === "completed" && !notification.error) {
        if (isShop) {
          history.push("/admin/" + authUser.shopId + "/view-menu")
        } else {
          history.push("/store")
        }
      }
    }
  }, [
    history,
    isLogin,
    authUser.shopId,
    dispatch,
    notification,
    isShop,
    toastInfo,
    toastSuccess,
    isClickReg,
  ])

  const label = isShop
    ? "Register as a customer?"
    : "Register as a store owner?"
  const labelName = isShop ? "Shop Name" : "Customer Name"

  return (
    <Container className="auth-form">
      <Image src="/logo64.png" centered />
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={6}>
          <Segment raised>
            <Label
              color="red"
              as="a"
              style={{ width: "100%" }}
              onClick={toggleView}
            >
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
              <Button
                size={"tiny"}
                type="submit"
                color="red"
                fluid
                onClick={submit}
              >
                Register
              </Button>
            </Form>

            <Divider />
            <Label
              as="a"
              basic
              style={{ width: "100%" }}
              color="red"
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
