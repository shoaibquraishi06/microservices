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


// ✅ GET Orders
export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/my-orders");

      // 👉 Backend se { orders: [] } aana chahiye
      return res.data.orders;

    } catch (err) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);