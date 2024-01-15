import { createSlice } from "@reduxjs/toolkit";
import { detailInitialState } from "./state";

export const detailSlice = createSlice({
  name: "detail",
  initialState: detailInitialState,
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload;
    },
    clearItem: (state) => {
      state.item = null;
    },
  },
});

export const { setItem, clearItem } = detailSlice.actions;

export default detailSlice.reducer;
