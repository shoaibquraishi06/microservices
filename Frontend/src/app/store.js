import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../feature/productSlice";
import authReducer from "../feature/authSlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
  },
});
