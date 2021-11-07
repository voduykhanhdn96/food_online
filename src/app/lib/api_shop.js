import { API_URL } from "../../env";

export async function getAllShop() {
  const response = await fetch(`${API_URL}/Shop/all`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  return data;
}

export async function createShop(shopData) {
  const response = await fetch(`${API_URL}/Shop/register`, {
    method: "POST",
    body: shopData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Insert shop is fail");
  }

  return null;
}

export async function updateShop(shopData) {
  const response = await fetch(`${API_URL}/Shop`, {
    method: "PUT",
    body: shopData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Update shop is fail");
  }

  return null;
}

export async function deleteShop(phoneNumber) {
  const response = await fetch(`${API_URL}/Shop/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phoneNumber: phoneNumber,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Delete shop is fail");
  }

  return null;
}

export async function loginShop(phoneNumber) {
  const response = await fetch(`${API_URL}/Shop/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phoneNumber: phoneNumber,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Password is failed");
  }

  return data;
}

export async function getShopById(shopId) {
  const response = await fetch(`${API_URL}/Shop/` + shopId);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Password is failed");
  }

  return data;
}
