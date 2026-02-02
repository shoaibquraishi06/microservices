import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3003/api/orders",
  withCredentials: true, // ⭐ COOKIE AUTO SEND
});

export const createOrderAPI = (orderData) => {
  return API.post("/", orderData);
};
