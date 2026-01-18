import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartAPI, getCartAPI } from "../api/cart.api";

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const { data } = await addToCartAPI({
        productId,
      
        qty: 1
      });
      return data; // updated cart
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Add to cart failed"
      );
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async () => {
    const { data } = await getCartAPI();
    return data;
  }
);
