import axios from "axios";

const API = axios.create({
  baseURL: "https://microservices-2-0221.onrender.com/api/orders",
  withCredentials: true,
});

// token auto attach
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const createOrderAPI = (orderData) =>
  API.post("/", orderData);

export const getMyOrdersAPI = () =>
  API.get("/me");

export default API;