import axios from "axios";

const API = axios.create({
  baseURL: "https://microservices-3-777q.onrender.com/api/products",
  withCredentials: true,
});

export const fetchProductsAPI = async () => {
  const { data } = await API.get("/");
   
  // console.log("PRODUCT API RESPONSE:", data);

  return data;
};

export const fetchProductByIdAPI = async (id) => {
  const { data } = await API.get(`/${id}`);

  // console.log("PRODUCT DETAIL RESPONSE:", data);

  return data.data;
};
