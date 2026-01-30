import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderAPI } from "../order/order.api";

export const createOrder = createAsyncThunk(
  "order/create",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await createOrderAPI(orderData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Order failed");
    }
  }
);
