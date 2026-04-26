import axios from "axios";

const API = axios.create({
  baseURL: "https://microservices-1-wmb0.onrender.com/api/cart/",
  withCredentials: true // 🔥 important (cookie/JWT)
});

export const addToCartAPI = (data) =>
  API.post("/items", data);

export const getCartAPI = () =>
  API.get("/" , () => console.log("cart api called"));