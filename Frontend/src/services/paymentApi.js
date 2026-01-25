import axios from "axios";

export const createOrderAPI = (amount) =>
  axios.post("http://localhost:3004/api/payments/create/695e56e1e712a83b0702c4d6", { amount });

export const verifyPaymentAPI = (data) =>
  axios.post("http://localhost:3004/api/payments/verify", data);
