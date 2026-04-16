import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getMyOrders } from "../order/order.Thunk";

const orderSlice = createSlice({
  name: "order",

  initialState: {
    loading: false,

    // 🔥 IMPORTANT (2 alag states)
    order: null,     // single order (checkout)
    orders: [],      // order history

    success: false,
    error: null
  },

  reducers: {
    resetOrder: (state) => {
      state.loading = false;
      state.success = false;
      state.order = null;
      state.error = null;
    }
  },

  extraReducers: (builder) => {

    // =============================
    // ✅ CREATE ORDER
    // =============================
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // 👉 backend se { order: {...} }
        state.order = action.payload.order;

        // 👉 optional: history me push bhi kar sakte ho
        if (action.payload.order) {
          state.orders.unshift(action.payload.order);
        }
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


    // =============================
    // ✅ GET MY ORDERS
    // =============================
    builder
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;

        // 👉 backend se { orders: [] }
        state.orders = action.payload;
      })

      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;