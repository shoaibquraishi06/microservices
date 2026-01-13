import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsAPI } from "../api/product.api";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchProductsAPI();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
