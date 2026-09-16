import { createAsyncThunk } from "@reduxjs/toolkit";
import searchProductsAPI from "../../api/search.api";

export const searchProducts = createAsyncThunk(
  "search/products",
  async (query, { rejectWithValue }) => {
    try {
      const response = await searchProductsAPI(query);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);