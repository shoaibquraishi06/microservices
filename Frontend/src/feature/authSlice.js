import { createSlice } from "@reduxjs/toolkit";

// localStorage se user uthana (page refresh ke baad)
const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // LOGIN SUCCESS
    loginSuccess(state, action) {
      state.user = action.payload;

      // Redux ke saath localStorage me bhi save
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
      );
    },

    // LOGOUT
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
