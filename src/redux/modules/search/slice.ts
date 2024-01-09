import { createSlice } from "@reduxjs/toolkit";
import { searchInitialState } from "./state";

export const searchSlice = createSlice({
  name: "search",
  initialState: searchInitialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchedBoardList = action.payload;
    },
  },
});

export const { setSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
