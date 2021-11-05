const BACKEND_DOMAIN = "http://localhost:8080/api"

export async function getAllShop() {
  const response = await fetch(`${BACKEND_DOMAIN}/Shop/all`)
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.")
  }

  return data
}

export async function createShop(shopData) {
  const response = await fetch(`${BACKEND_DOMAIN}/Shop/register`, {
    method: "POST",
    body: shopData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Insert shop is fail")
  }

  return null
}

export async function updateShop(shopData) {
  const response = await fetch(`${BACKEND_DOMAIN}/Shop`, {
    method: "PUT",
    body: shopData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Update shop is fail")
  }

  return null
}

export async function deleteShop(phoneNumber) {
  const response = await fetch(`${BACKEND_DOMAIN}/Shop/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phoneNumber: phoneNumber,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Delete shop is fail")
  }

  return null
}

export async function loginShop(phoneNumber) {
  const response = await fetch(`${BACKEND_DOMAIN}/Shop/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phoneNumber: phoneNumber,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Password is failed")
  }

  return data
}

export async function getShopById(shopId) {
  const response = await fetch(`${BACKEND_DOMAIN}/Shop/` + shopId)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Password is failed")
  }

  return data
}
