import { API_URL } from '../../env';

export async function createItem(foodData) {
  const response = await fetch(`${API_URL}/Item/create`, {
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
  const response = await fetch(`${API_URL}/Item`, {
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
  const response = await fetch(`${API_URL}/Item/`, {
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
  const response = await fetch(`${API_URL}/Item/Active`, {
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
