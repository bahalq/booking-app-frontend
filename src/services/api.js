import { API_BASE_URL } from "../config/api";

const API_BASE = API_BASE_URL;

// Helper for fetch with credentials
const fetchAPI = async (endpoint, options = {}) => {
  // 1. Khalli l-headers khawyin f l-bdya
  const headers = { ...options.headers };

  // 2. Ila kant l-body machi FormData, zid "application/json"
  // Ila kant FormData, Mat-dirch Content-Type ga3! (L-browser ghadi i-tkellef)
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const config = {
    ...options,
    credentials: "include", // "include" a7san mn "same-origin" ila kanti m-hosti f domains mukhtalifa
    headers: headers, // Sta3mel l-headers li qaddina
  };

  try {
    const response = await fetch(`${API_BASE}/${endpoint}`, config);
    
    // Check ila l-response machi JSON (bach t-fada error dyal parsing)
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    
    const text = await response.text();
    return { success: false, error: "Server returned non-JSON response", details: text };
    
  } catch (error) {
    console.error("Fetch error:", error);
    return { success: false, error: "Network error" };
  }
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
