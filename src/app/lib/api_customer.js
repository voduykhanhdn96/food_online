import { API_URL } from '../../env';

export async function createCustomer(shopData) {
  const response = await fetch(`${API_URL}/Customer/register`, {
    method: "POST",
    body: shopData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Insert customer is fail");
  }

  return null;
}

export async function loginCustomer(phoneNumber) {
  const response = await fetch(`${API_URL}/Customer/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phoneNumber: phoneNumber,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.customerId) {
    throw new Error(data.message || "Password is failed");
  }

  return data;
}

// export async function updateCustomer(shopData) {
//   const response = await fetch(`${API_URL}/Shop`, {
//     method: "PUT",
//     body: shopData,
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Update shop is fail");
//   }

//   return null;
// }

// export async function deleteCustomer(phoneNumber) {
//   const response = await fetch(`${API_URL}/Shop/delete`, {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       phoneNumber: phoneNumber,
//     }),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Delete shop is fail");
//   }

//   return null;
// }
