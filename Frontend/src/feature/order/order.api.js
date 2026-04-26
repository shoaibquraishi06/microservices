// ===============================
// src/feature/order/order.api.js
// ===============================
import axios from "axios";

const API = axios.create({
  baseURL: "https://microservices-2-o221.onrender.com/api/orders",
  withCredentials: true, // cookie auth
});

export const createOrderAPI = (orderData) =>
  API.post("/", orderData);

export const getMyOrdersAPI = () =>
  API.get("/me");