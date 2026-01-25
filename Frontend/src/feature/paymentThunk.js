import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderAPI,
  verifyPaymentAPI
} from "../services/paymentApi";

// 🔹 Create Razorpay Order
export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async (amount, { rejectWithValue }) => {
    try {
      const { data } = await createOrderAPI(amount);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 🔹 Verify Payment
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const { data } = await verifyPaymentAPI(paymentData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
