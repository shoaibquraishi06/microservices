import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../feature/productSlice";
import authReducer from "../feature/authSlice"
import cartReducer from "../feature/cartSlice"
import orderReducer from "../feature/order/orderSlice"
import paymentReducer from "../feature/paymentSlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    cart:cartReducer,
    order: orderReducer,
    payment: paymentReducer
  },
});
