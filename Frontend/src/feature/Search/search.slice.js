import { createSlice } from "@reduxjs/toolkit";
import { searchProducts } from "../Search/search.Thunk";

const initialState = {
  query: "",
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",

  initialState,

  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },

    clearSearch: (state) => {
      state.query = "";
      state.results = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // SEARCH START
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // SEARCH SUCCESS
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.results = action.payload.data || [];
      })

      // SEARCH ERROR
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        state.results = [];
      });
  },
});

export const {
  setSearchQuery,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;