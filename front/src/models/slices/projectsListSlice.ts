import { createSlice } from "@reduxjs/toolkit";

export type ProjectType = {
  id: string,
  title: string,
  img: string,
}

const projectsListSlice = createSlice({
  name: 'projectsList',
  initialState: {
    projects: [],
  },
  reducers: {
    addItem: (state, action) => {
      const projects: ProjectType[] = state.projects;
      projects.push(action.payload);
    },
    removeItem: (state, action) => {
      (state.projects as ProjectType[]) = state.projects.filter((item) => item["id"] !== action.payload);
    },
    changeProjectTitle: (state, action) => {
      const projects: ProjectType[] = state.projects;
      const project = projects.filter((item) => item.id === action.payload.id)[0];
      project.title = action.payload.value;
    },
    changeProjectImg: (state, action) => {
      const projects: ProjectType[] = state.projects;
      const project = projects.filter((item) => item.id === action.payload.id)[0];
      project.img = action.payload.value;
    }
  }
});

export const { 
  addItem, 
  removeItem,
  changeProjectImg,
  changeProjectTitle
} = projectsListSlice.actions;

export default projectsListSlice.reducer;