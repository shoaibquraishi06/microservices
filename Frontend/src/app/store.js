import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../feature/productSlice";
import authReducer from "../feature/authSlice"
import cartReducer from "../feature/cartSlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    cart:cartReducer
  },
});
