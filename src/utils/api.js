const api = {};

const BASE_URL = "https://public-api.delcom.org/api/v1";

// Fungsi untuk manajemen token
api.putAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

api.getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// Fungsi bantuan untuk permintaan dengan autentikasi
const _fetchWithAuth = async (url, options = {}) => {
  const token = api.getAccessToken();
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };
  return fetch(url, { ...options, headers });
};

// API Autentikasi
api.postAuthRegister = async ({ name, email, password }) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to register user");
  }
  return data.message;
};

api.postAuthLogin = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to log in");
  }
  return data.data.token;
};

// API Pengguna
api.getMe = async () => {
  const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user data");
  }
  return data.data.user;
};

api.postChangePhotoProfile = async ({ photoFile }) => {
  const formData = new FormData();
  formData.append("photo", photoFile);
  const response = await _fetchWithAuth(`${BASE_URL}/users/photo`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to change photo profile");
  }
  return data.message;
};

// API Aucations
api.postAddAucation = async ({
  title,
  description,
  start_bid,
  closed_at,
  cover,
}) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("start_bid", start_bid);
  formData.append("closed_at", closed_at);
  formData.append("cover", cover);

  // Logging opsional untuk debugging
  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
  });

  const response = await _fetchWithAuth(`${BASE_URL}/aucations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${api.getAccessToken()}`,
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create aucation");
  }

  return data.data.auction_id;
};

api.getAllAucations = async () => {
  const response = await _fetchWithAuth(`${BASE_URL}/aucations`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch aucations");
  }
  return data.data?.aucations || [];
};

api.getDetailAucation = async (id) => {
  const response = await _fetchWithAuth(`${BASE_URL}/aucations/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch aucation detail");
  }
  return data.data.aucation;
};

api.deleteAucation = async (id) => {
  const response = await _fetchWithAuth(`${BASE_URL}/aucations/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete aucation");
  }
  return data.message;
};

api.putUpdateAucation = async ({
  id,
  title,
  description,
  start_bid,
  closed_at,
}) => {
  const bodyParams = new URLSearchParams({
    title,
    description,
    start_bid,
    closed_at,
  });

  const response = await _fetchWithAuth(`${BASE_URL}/aucations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: bodyParams,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update aucation");
  }

  return data;
};

api.postChangeAucationCover = async ({ id, cover }) => {
  const formData = new FormData();
  formData.append("cover", cover);

  const response = await _fetchWithAuth(`${BASE_URL}/aucations/${id}/cover`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to change aucation cover");
  }
  return data.message;
};

api.postAddBid = async ({ id, bid }) => {
  const bodyParams = new URLSearchParams({ bid });

  const response = await _fetchWithAuth(`${BASE_URL}/aucations/${id}/bids`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: bodyParams,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to add bid");
  }
  return data;
};

api.deleteBid = async ({ id }) => {
  const response = await _fetchWithAuth(`${BASE_URL}/aucations/${id}/bids`, {
    method: "DELETE",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete bid");
  }

  return data.message;
};

export default api;
