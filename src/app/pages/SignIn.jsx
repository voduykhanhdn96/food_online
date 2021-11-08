import { useHistory } from "react-router"
import { useState } from "react"
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
import { loginAction } from "../store/actions/auth-action"
import { useRef } from "react"
import { useEffect } from "react"
import useToast from "../hooks/useToast"

const Login = () => {
  const { toastSuccess, toastError } = useToast()

  const history = useHistory()
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const authUser = useSelector(state => state.auth)

  const refPhoneNumber = useRef()
  const [isShop, setIsShop] = useState(true)
  const [isClickLog, setIsClickLog] = useState(false)
  const [isLoginCart, setIsLoginCart] = useState(false)

  const signUp = () => {
    history.push("/sign-up")
  }

  const toggleView = () => {
    setIsShop(!isShop)
  }

  const submit = () => {
    setIsClickLog(true)
    if (isShop) {
      dispatch(loginAction(refPhoneNumber.current.value, "SHOP"))
    } else {
      dispatch(loginAction(refPhoneNumber.current.value, "USER"))
    }
  }

  useEffect(() => {
    if (isClickLog) {
      if (notification.status === "completed" && !notification.error) {
        toastSuccess("Login is success !")
        if (isShop) {
          history.push(`/admin/${authUser.shopId}/view-menu`)
        } else {
          if (isLoginCart) {
            history.push(history.location.pathname)
            setIsLoginCart(false)
          } else {
            history.push("/stores")
          }
        }
      }
      if (notification.status === "completed" && notification.error) {
        toastError("Phone Number is wrong !")
        setIsClickLog(false)
      }
    }
  }, [
    notification,
    history,
    isShop,
    isLoginCart,
    isClickLog,
    authUser,
    toastSuccess,
    toastError,
  ])

  useEffect(() => {
    if (
      history.location.pathname.includes("cart") ||
      history.location.pathname.includes("store")
    ) {
      setIsShop(false)
      setIsLoginCart(true)
    }
  }, [history])
  const label = isShop ? "Sign in as customer?" : "Sign in as store owner?"

  return (
    <Container className="auth-form">
      <Image src="/logo64.png" centered />
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={6}>
          {!isLoginCart && (
            <>
              <Label
                color="red"
                as="a"
                style={{ width: "100%" }}
                onClick={toggleView}
              >
                <Icon name="question circle" /> {label}
              </Label>
              <Divider />
            </>
          )}

          <Segment raised>
            <Form>
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
                Submit
              </Button>
            </Form>

            {!isLoginCart && (
              <>
                <Divider />
                <Label
                  as="a"
                  basic
                  color="red"
                  style={{ width: "100%" }}
                  onClick={signUp}
                >
                  <Icon name="user plus" /> Don't have account? Register now
                </Label>
              </>
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </Container>
  )
}

export default Login
