const BACKEND_DOMAIN = "http://localhost:8080/api"

export async function createItem(foodData) {
  const response = await fetch(`${BACKEND_DOMAIN}/Item/create`, {
    method: "POST",
    body: foodData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Insert item is fail")
  }

  return null
}

export async function updateItem(itemData) {
  const response = await fetch(`${BACKEND_DOMAIN}/Item`, {
    method: "PUT",
    body: itemData,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Update shop is fail")
  }

  return null
}

export async function deleteItem(shopId, itemId) {
  const response = await fetch(`${BACKEND_DOMAIN}/Item/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      shopId: shopId,
      itemId: itemId,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Delete item is fail")
  }

  return null
}

export async function activeItem(shopId, itemId) {
  const response = await fetch(`${BACKEND_DOMAIN}/Item/Active`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      shopId: shopId,
      itemId: itemId,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Active item is fail")
  }

  return null
}
