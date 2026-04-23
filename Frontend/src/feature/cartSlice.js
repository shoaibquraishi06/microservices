import { createSlice } from "@reduxjs/toolkit";
import { addToCart, fetchCart } from "./cartThunk";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: { resetCart: (state) => {
      state.items = [];
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // ADD TO CART
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })

  .addCase(addToCart.fulfilled, (state, action) => {
  state.loading = false;
  state.items = action.payload.cart?.items || [];  // same fix
})

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH CART
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
  state.loading = false;
  state.items = action.payload.cart?.items || [];  // cart ke andar items hai
})

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;