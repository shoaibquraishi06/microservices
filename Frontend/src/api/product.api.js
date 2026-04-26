import axios from "axios";

const API = axios.create({
  baseURL: "https://microservices-3-777q.onrender.com/api/products",
  withCredentials: true,
});
export const fetchProductsAPI = async () => {
  const { data } = await API.get("/");
  return data;
};


export const fetchProductByIdAPI = (id) => {
  return axios.get(`https://microservices-3-777q.onrender.com/api/products/${id}`);
};
