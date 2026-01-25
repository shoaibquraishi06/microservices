import { createSlice } from "@reduxjs/toolkit";
import { createOrder, verifyPayment } from "./paymentThunk";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    order: null,
    success: false,
    error: null
  },
  reducers: {
    resetPayment: (state) => {
      state.loading = false;
      state.order = null;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // CREATE ORDER
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // VERIFY PAYMENT
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
