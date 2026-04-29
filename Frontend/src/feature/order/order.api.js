import axios from "axios";

const API = axios.create({
  baseURL: "https://microservices-2-o221.onrender.com/api/orders",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const createOrderAPI = (data) => API.post("/", data);
export const getMyOrdersAPI = () => API.get("/myorders");
export const getOrderAPI = () => API.get("/me");