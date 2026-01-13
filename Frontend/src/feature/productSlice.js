import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productThunk";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log("REDUX FULFILLED PAYLOAD:", action.payload);
        state.loading = false;
        state.items = action.payload.data; // 🔥 THIS IS THE FIX
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
