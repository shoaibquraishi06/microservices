import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3003/api/orders",
  withCredentials: true, // ⭐ COOKIE AUTO SEND
});

export const createOrderAPI = (orderData) => {
  console.log("Sending order data:", orderData);
  return API.post("/", orderData);
 
};
