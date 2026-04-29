import axios from "axios";

const API = axios.create({
  baseURL: "https://microservices-2-0221.onrender.com/api/orders",
  withCredentials: true,
});

export const createOrderAPI = (data) => API.post("/", data);

export const getMyOrdersAPI = () => API.get("/myorders");

export const getOrderAPI = () => API.get("/me");