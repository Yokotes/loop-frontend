import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    expanded: false,
  },
  reducers: {
    toggleExpanded: (state) => {
      state.expanded = !state.expanded
    }
  }
})

export const { toggleExpanded } = sidebarSlice.actions;

export default sidebarSlice.reducer;