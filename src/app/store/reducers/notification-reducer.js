const initialNotification = {
  error: null,
  status: null,
}

const notificationReducer = (
  state = initialNotification,
  { type, payload }
) => {
  switch (type) {
    case "SEND":
      return { error: null, status: "pending" }
    case "SUCCESS":
      return { error: null, status: "completed" }
    case "ERROR":
      return { error: payload.errorMessage, status: "completed" }
    case "CLEAR_STATUS":
      return { error: null, status: null }
    default:
      return state
  }
}

export default notificationReducer
