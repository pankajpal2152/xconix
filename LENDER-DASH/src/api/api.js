import axios from "axios";

const api = axios.create({
  baseURL: "http://172.105.36.66:8020",
  headers: {
    "Content-Type": "application/json",
  },
});

/* =====================
   REQUEST INTERCEPTOR
   ===================== */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =====================
   RESPONSE INTERCEPTOR
   ===================== */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("JWT expired or invalid");
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
