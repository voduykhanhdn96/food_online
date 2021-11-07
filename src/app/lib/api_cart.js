const BACKEND_DOMAIN = "http://localhost:8080/api";

export async function getCartData(cartId) {
  const response = await fetch(
    `${BACKEND_DOMAIN}/Cart/` + cartId + `?getShop=true`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  return data;
}

export async function existCartCustomerWithShop(customerId, shopId) {
  const response = await fetch(`${BACKEND_DOMAIN}/Cart/exist/shop/customer`, {
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
  const response = await fetch(`${BACKEND_DOMAIN}/Cart/Create`, {
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
  const response = await fetch(`${BACKEND_DOMAIN}/Cart/submit`, {
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
  const response = await fetch(`${BACKEND_DOMAIN}/Cart/unsubmit`, {
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
  const response = await fetch(`${BACKEND_DOMAIN}/Cart/add/item`, {
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
  const response = await fetch(`${BACKEND_DOMAIN}/Cart/remove/item`, {
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
