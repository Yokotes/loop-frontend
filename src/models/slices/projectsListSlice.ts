import { createSlice } from "@reduxjs/toolkit";

const projectsListSlice = createSlice({
  name: 'projectsList',
  initialState: {
    projects: [
      {
        id: '0',
        title: 'My awesome project',
        img: 'img/default_project_img.jpg',
        tasks: [
          {
            id: '0',
            title: 'Do awesome stuff',
            status: 1
          }
        ],
        isShowed: false,
      },
    ],
  },
  reducers: {
    addItem: (state, action) => {
      state.projects.push(action.payload);
    },
    removeItem: (state, action) => {
      state.projects = state.projects.filter((item) => item.id !== action.payload);
    },
    addTask: (state, action) => {
      const project = state.projects.filter((item) => item.id === action.payload.projectId)[0];
      project.tasks.push(action.payload.taskData)
    },
    removeTask: (state, action) => {
      const project = state.projects.filter((item) => item.id === action.payload.projectId)[0];
      const task = project.tasks.filter((item) => item.id === action.payload.taskId)[0];
      task.status = 4;
    },
    toggleIsShowed: (state, action) => {
      const project = state.projects.filter((item) => item.id === action.payload)[0];
      project.isShowed = !project.isShowed;
    }
  }
});

export const { 
  addItem, 
  removeItem, 
  addTask, 
  removeTask,
  toggleIsShowed 
} = projectsListSlice.actions;

export default projectsListSlice.reducer;