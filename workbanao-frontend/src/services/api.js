import axios from "axios";

// Create Axios instance with enhanced configuration
const api = axios.create({
  baseURL: "http://localhost:8081/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

// Request interceptor for logging or modifying requests
api.interceptors.request.use(
  (config) => {
    console.log("Request sent to:", config.url);
    return config;
  },
  (error) => {
    console.error("Request setup error:", error.message);
    return Promise.reject(error);
  }
);

// Function to set Authorization header globally
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Function to refresh token
export const refreshToken = async () => {
  try {
    const response = await axios.post("http://localhost:8081/api/refresh-token", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    const newToken = response.data.accessToken;
    setAuthToken(newToken);
    localStorage.setItem("accessToken", newToken);
    return newToken;
  } catch (error) {
    console.error("Token refresh failed:", error.response?.data || error.message);
    throw error;
  }
};

// Response interceptor with token refresh for 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Unable to refresh token:", refreshError);
        window.location.href = "/login";
      }
    }
    console.error("API error:", {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

// Initialize token from localStorage
const storedToken = localStorage.getItem("accessToken");
if (storedToken) {
  setAuthToken(storedToken);
}

export default api;