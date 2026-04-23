// ===============================
// src/feature/order/orderSlice.js
// ===============================
import { createSlice } from "@reduxjs/toolkit";
import { createOrder,getMyOrders,} from "../order/order.Thunk";

const initialState = {
  loading: false,

  // latest created order
  order: null,

  // history
  orders: [],

  success: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    resetOrder: (state) => {
      state.loading = false;
      state.success = false;
      state.order = null;
      state.error = null;
    },

    clearOrders: (state) => {
      state.orders = [];
      state.order = null;
      state.error = null;
      state.loading = false;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===================
      // CREATE ORDER
      // ===================
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // backend may return {order:{...}}
        state.order =
          action.payload?.order ||
          action.payload ||
          null;

        // history top insert
        if (state.order) {
          state.orders.unshift(state.order);
        }
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // ===================
      // GET MY ORDERS
      // ===================
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;

        // supports:
        // {orders:[...]}
        // or [...]
        state.orders =
          action.payload?.orders ||
          action.payload ||
          [];
      })

      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetOrder,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;