import { API_BASE_URL } from "../config/api";

const API_BASE = API_BASE_URL;

// Helper for fetch with credentials
const fetchAPI = async (endpoint, options = {}) => {
  const defaultHeaders = {
    "Content-Type": "application/json", // Move this logic
  };

  if (!(options.body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const config = {
    ...options,
    credentials: "same-origin",
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE}/${endpoint}`, config);
  const data = await response.json();
  return data;
};

export const api = {
  // Auth
  login: (creds) =>
    fetchAPI("login.php", { method: "POST", body: JSON.stringify(creds) }),
  register: (userData) =>
    fetchAPI("register.php", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
  logout: () => fetchAPI("logout.php"),
  checkAuth: () => fetchAPI("checkAuth.php"),

  // Grounds
  getAllGrounds: () => fetchAPI("getGrounds.php"),
  getGroundDetails: (id) => fetchAPI(`getGroundDetails.php?id=${id}`),
  getGroundPrices: () => fetchAPI("getGroundPrices.php"),

  // Activities/Terrains
  getActivities: () => fetchAPI("getActivities.php"),
  getTerrainsByActivity: (groundId, activityId) =>
    fetchAPI(
      `getTerrainsByActivity.php?ground_id=${groundId}&activity_id=${activityId}`,
    ),

  // Booking
  getAvailability: (terrainId, date) =>
    fetchAPI(`getAvailability.php?terrain_id=${terrainId}&date=${date}`),
  getMonthAvailability: (terrainId, year, month) =>
    fetchAPI(
      `getMonthAvailability.php?terrain_id=${terrainId}&year=${year}&month=${month}`,
    ),
  createBooking: (bookingData) =>
    fetchAPI("createBooking.php", {
      method: "POST",
      body: JSON.stringify(bookingData),
    }),

  // Admin
  addGround: (formData) =>
    fetchAPI("addGround.php", { method: "POST", body: formData }), // Legacy or keep for now logic

  // New Admin Flow
  createGround: (formData) =>
    fetchAPI("createGround.php", { method: "POST", body: formData }),
  addTerrain: (formData) =>
    fetchAPI("addTerrain.php", { method: "POST", body: formData }),

  // Helpers
  getTerrainsByGround: (groundId) =>
    fetchAPI(`getAllTerrains.php?ground_id=${groundId}`),

  uploadImage: (formData) => {
    // Special case for FormData (don't set Content-Type manually)
    return fetch(`${API_BASE}/addGround.php`, {
      // Or separate upload endpoint
      method: "POST",
      credentials: "include",
      body: formData,
    }).then((res) => res.json());
  },
};
