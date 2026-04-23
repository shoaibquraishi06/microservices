// ===============================
// src/feature/order/orderThunk.js
// ===============================
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderAPI, getMyOrdersAPI } from "./order.api";

const getError = (err, fallback) => err?.response?.data?.message || fallback;

// CREATE ORDER
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await createOrderAPI(orderData);
      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Order failed"));
    }
  },
);

// FETCH MY ORDERS (refresh safe)
export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getMyOrdersAPI();
      return data;
    } catch (err) {
      return rejectWithValue(getError(err, "Failed to load orders"));
    }
  },
);
