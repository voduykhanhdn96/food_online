const BACKEND_DOMAIN = "http://localhost:8080/api";

export async function changeStatus(orderId, orderStatus, customerId, shopId) {
  const response = await fetch(`${BACKEND_DOMAIN}/Order/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderId: orderId,
      orderStatus: orderStatus,
      customerId: customerId,
      shopId: shopId,
    }),
  });

  const data = await response.json();

  if (data.errorMessage) {
    throw new Error(data.errorMessage);
  }
  if (!response.ok) {
    throw new Error(data.errorMessage || "Order is fail");
  }

  return data;
}

export async function cancel(orderId, customerId) {
  const response = await fetch(`${BACKEND_DOMAIN}/Order/cancel`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderId: orderId,
      customerId: customerId,
    }),
  });

  const data = await response.json();

  if (data.errorMessage) {
    throw new Error(data.errorMessage);
  }
  if (!response.ok) {
    throw new Error(data.message || "Order is fail");
  }

  return data;
}

export async function createOrder(cartId, infomation) {
  const response = await fetch(`${BACKEND_DOMAIN}/Order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cartId: cartId,
      deliveryInformation: infomation,
    }),
  });

  const data = await response.json();

  return data;
}

export async function getAllOrder(customerId) {
  const response = await fetch(
    `${BACKEND_DOMAIN}/Order/` + customerId + `/customer/all`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Order is fail");
  }

  return data;
}

export async function getAllOrderWithStore(shopId) {
  const response = await fetch(
    `${BACKEND_DOMAIN}/Order/` + shopId + `/shop/all`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Order is fail");
  }

  return data;
}

export async function getOrder(orderId) {
  const response = await fetch(`${BACKEND_DOMAIN}/Order/` + orderId, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Order is fail");
  }

  return data;
}
// getOrderData = () => {
//   fetch("https://localhost:5001/api/Order/" + this.state.cartId, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((responseData) => console.log(responseData))
//     .catch((err) => console.log(err));
// };

// placeOrder = () => {
//   fetch("https://localhost:5001/api/Order", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       cartId: this.state.cartId,
//       deliveryInformation: "FIN5 NUMBER ONE",
//     }),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// };

// cancelOrder = () => {
//   fetch("https://localhost:5001/api/Order/Cancel", {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       orderId: this.state.cartId,
//       customerId: this.state.customerId,
//     }),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// };

// orderStatus = () => {
//   fetch("https://localhost:5001/api/Order/Cancel", {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       orderId: this.state.cartId,
//       orderStatus: "Confirmed",
//       customerId: this.state.customerId,
//       shopId: this.state.shopId,
//     }),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// };

// getAllCustomerOrder = () => {
//   var url =
//     "https://localhost:5001/api/Order/" +
//     this.state.customerId +
//     "/customer/all";
//   fetch(url, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((responseData) => console.log(responseData))
//     .catch((err) => console.log(err));
// };

// getAllShopOrder = () => {
//   var url =
//     "https://localhost:5001/api/Order/" + this.state.shopId + "/customer/all";
//   fetch(url, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((responseData) => console.log(responseData))
//     .catch((err) => console.log(err));
// };
