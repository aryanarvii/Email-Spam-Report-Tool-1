import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Optional: Global error handling interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
