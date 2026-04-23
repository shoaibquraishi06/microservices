// ===============================
// src/feature/order/order.api.js
// ===============================
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3003/api/orders",
  withCredentials: true, // cookie auth
});

export const createOrderAPI = (orderData) =>
  API.post("/", orderData);

export const getMyOrdersAPI = () =>
  API.get("/me");