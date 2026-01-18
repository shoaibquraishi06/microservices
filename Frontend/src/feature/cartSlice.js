import { createSlice } from "@reduxjs/toolkit";
import { addToCart } from "./cartThunk";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
  console.log("REDUX CART:", action.payload);

  // 🔥 EXACT FIX (payload ke structure ke according)
  state.items = action.payload.cart.items || [];

  state.loading = false;
})


      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default cartSlice.reducer;
