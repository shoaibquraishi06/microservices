
import axios from "axios";

const sellerApi = axios.create({
  baseURL: "http://localhost:3007/api/seller/dashboard",
  withCredentials: true,
 
});

export const getSellerMetrics = async () => {
  const { data } = await sellerApi.get("/metrics");
  console.log(data);
  return data;
};

export const getSellerOrders = async () => {
  const { data } = await sellerApi.get("/orders");
  console.log(data);
  return data.orders;
};

export const getSellerProducts = async () => {
  const { data } = await sellerApi.get("/products");
  return data.products;
};

export default sellerApi;
