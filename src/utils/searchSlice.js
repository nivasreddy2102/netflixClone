import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    toggleSearch: false,
  },
  reducers: {
    addSearch: (state) => {
      state.toggleSearch = !state.toggleSearch;
    },
  },
});

export const { addSearch } = searchSlice.actions;
export default searchSlice.reducer;
