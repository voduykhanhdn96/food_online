import { API_URL } from "../../env";

export async function getCartData(cartId) {
  const response = await fetch(`${API_URL}/Cart/` + cartId + `?getShop=true`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  return data;
}

export async function existCartCustomerWithShop(customerId, shopId) {
  const response = await fetch(`${API_URL}/Cart/exist/shop/customer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerId: customerId,
      shopId: shopId,
    }),
  });

  if (!response.ok) {
    throw new Error("Could not fetch quotes.");
  }

  return response;
}

export async function createCart(customerId, shopId) {
  const response = await fetch(`${API_URL}/Cart/Create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerId: customerId,
      shopId: shopId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Delete shop is fail");
  }

  return data;
}

export async function submitItem(items, customerId, cartId) {
  const response = await fetch(`${API_URL}/Cart/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerId: customerId,
      items: items,
      cartId: cartId,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Delete shop is fail");
  }

  return data;
}

export async function unSubmitItem(customerId, cartId) {
  const response = await fetch(`${API_URL}/Cart/unsubmit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerId: customerId,
      cartId: cartId,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Delete shop is fail");
  }

  return data;
}

export async function addItem(customerId, itemId, cartId) {
  const response = await fetch(`${API_URL}/Cart/add/item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerId: customerId,
      itemId: itemId,
      cartId: cartId,
    }),
  });
  const data = await response.json();
  if (data.errorMessage) {
    throw new Error(data.errorMessage);
  }
  if (!response.ok) {
    throw new Error(data.message || "Add to cart is fail");
  }

  return data;
}

export async function removeItem(customerId, itemId, cartId) {
  const response = await fetch(`${API_URL}/Cart/remove/item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerId: customerId,
      itemId: itemId,
      cartId: cartId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Delete shop is fail");
  }

  return data;
}
