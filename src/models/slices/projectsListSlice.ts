import { createSlice } from "@reduxjs/toolkit";

const projectsListSlice = createSlice({
  name: 'projectsList',
  initialState: {
    projects: [
      {
        id: '0',
        title: 'My awesome project',
        img: 'img/default_project_img.jpg',
      },
    ],
  },
  reducers: {
    addItem: (state, action) => {
      state.projects.push(action.payload);
    },
    removeItem: (state, action) => {
      state.projects = state.projects.filter((item) => item.id !== action.payload);
    }
  }
});

export const { addItem, removeItem } = projectsListSlice.actions;

export default projectsListSlice.reducer;