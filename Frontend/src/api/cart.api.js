import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3002/api/cart/",
  withCredentials: true // 🔥 important (cookie/JWT)
});

export const addToCartAPI = (data) =>
  API.post("/items", data);

export const getCartAPI = () =>
  API.get("/" , () => console.log("cart api called"));