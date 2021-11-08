import { API_URL } from "../../env"

export async function changeStatus(orderId, orderStatus, customerId, shopId) {
  const response = await fetch(`${API_URL}/Order/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderId: orderId,
      orderStatus: orderStatus,
      customerId: customerId,
      shopId: shopId,
    }),
  })

  const data = await response.json()

  if (data.errorMessage) {
    throw new Error(data.errorMessage)
  }
  if (!response.ok) {
    throw new Error(data.errorMessage || "Order is fail")
  }

  return data
}

export async function cancel(orderId, customerId) {
  const response = await fetch(`${API_URL}/Order/cancel`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderId: orderId,
      customerId: customerId,
    }),
  })

  const data = await response.json()

  if (data.errorMessage) {
    throw new Error(data.errorMessage)
  }
  if (!response.ok) {
    throw new Error(data.message || "Order is fail")
  }

  return data
}

export async function createOrder(cartId, infomation) {
  const response = await fetch(`${API_URL}/Order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cartId: cartId,
      deliveryInformation: infomation,
    }),
  })

  const data = await response.json()

  return data
}

export async function getAllOrder(customerId) {
  const response = await fetch(`${API_URL}/Order/${customerId}/customer/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Order is fail")
  }

  return data
}

export async function getAllOrderWithStore(shopId) {
  const response = await fetch(`${API_URL}/Order/${shopId}/shop/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Order is fail")
  }

  return data
}

export async function getOrder(orderId) {
  const response = await fetch(`${API_URL}/Order/${orderId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Order is fail")
  }

  return data
}
