import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [
      {
        id: 0,
        title: 'My Projects',
        icon: 'img/menu/projects.svg',
        path: '/projects',
        isCurrent: true,
      },
      {
        id: 1,
        title: 'My Tasks',
        icon: 'img/menu/tasks.svg',
        path: '/tasks',
        isCurrent: false,
      },
      {
        id: 2,
        title: 'Support',
        icon: 'img/menu/support.svg',
        path: '/support',
        isCurrent: false,
      }
    ]
  },
  reducers: {
    setCurrentItem: (state, action) => {
      state.items.map((item) => item.isCurrent = false)
      const item = state.items.filter((item) => item.id === action.payload)[0]
      if (item) {
        item.isCurrent = true;
      }
    }
  }
});

export const { setCurrentItem } = menuSlice.actions;

export default menuSlice.reducer;