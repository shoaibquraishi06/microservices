import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api/products",
  withCredentials: true,
});
export const fetchProductsAPI = async () => {
  const { data } = await API.get("/");
  return data;
};

