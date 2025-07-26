import axios from "axios";

// Create Axios instance with base config
const api = axios.create({
  baseURL: "http://localhost:8081/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

// ✅ Request Interceptor
api.interceptors.request.use(
  (config) => {
    console.log("📤 Request to:", config.url);
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error.message);
    return Promise.reject(error);
  }
);

// ✅ Set or remove Auth token globally
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("✅ Auth token set");
  } else {
    delete api.defaults.headers.common["Authorization"];
    console.log("🧹 Auth token removed");
  }
};

// ✅ Refresh access token using refresh token
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post("http://localhost:8081/api/auth/refresh-token", {
      refreshToken,
    });
    const newAccessToken = response.data.token;

    // Update headers + localStorage
    setAuthToken(newAccessToken);
    localStorage.setItem("accessToken", newAccessToken);
    console.log("🔄 Token refreshed");

    return newAccessToken;
  } catch (error) {
    console.error("⚠️ Token refresh failed:", error.response?.data || error.message);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    throw error;
  }
};

// ✅ Response Interceptor to handle 401 and auto-refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const skipRedirect = originalRequest.headers["X-Skip-Redirect"] === "true";

    if (error.response?.status === 401 && !originalRequest._retry && !skipRedirect) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest); // Retry original request
      } catch (refreshError) {
        console.error("🔒 Unable to refresh token:", refreshError.message);
        window.location.href = "/login"; // Redirect only if refresh fails
      }
    }

    console.error("❗ API error:", {
      status: error.response?.status,
      data: error.response?.data,
      url: originalRequest?.url,
    });

    return Promise.reject(error);
  }
);


// ✅ Set token on app startup (if exists)
const storedToken = localStorage.getItem("accessToken");
if (storedToken) {
  setAuthToken(storedToken);
  console.log("🚀 Initialized token from localStorage");
}

export default api;
