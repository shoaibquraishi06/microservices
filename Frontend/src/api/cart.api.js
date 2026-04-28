import axios from "axios";

const API = axios.create({
  baseURL: "https://microservices-1-wmb0.onrender.com/api/cart",
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

export const addToCartAPI = (data) => API.post("/items", data);

export const getCartAPI = () => API.get("/");

export const removeFromCartAPI = (id) => API.delete(`/items/${id}`);

export default API;