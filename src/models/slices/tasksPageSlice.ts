import { createSlice } from "@reduxjs/toolkit";

const taskPageSlice = createSlice({
  name: 'taskPage',
  initialState: {
    currentProject: '404',
    groups: [
      {
        id: '0',
        title: 'Right now',
        isShowed: false,
        tasks: [
          {
            id: '0',
            title: 'Do awesome stuff',
            status: 1
          }
        ]
      }
    ]
  },
  reducers: {
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    removeGroup: (state, action) => {
      state.groups = state.groups.filter((group) => group.id !== action.payload);
    },
    addTask: (state, action) => {
      const group = state.groups.filter((group) => group.id === action.payload.projectId)[0];
      group.tasks.push(action.payload.taskData);
    },
    removeTask: (state, action) => {
      const group = state.groups.filter((group) => group.id === action.payload.projectId)[0];
      group.tasks = group.tasks.filter((task) => task.id !== action.payload.taskId);
    },
    setTaskStatus: (state, action) => {
      const group = state.groups.filter((group) => group.id === action.payload.projectId)[0];
      const task = group.tasks.filter((item) => item.id === action.payload.taskId)[0];
      task.status = action.payload.status;
    },
    toggleShowed: (state, action) => {
      const group = state.groups.filter((group) => group.id === action.payload)[0];
      group.isShowed = !group.isShowed;
    }
  }
});

export const { 
  addGroup,
  removeGroup, 
  addTask,  
  removeTask,
  setTaskStatus,
  toggleShowed,
} = taskPageSlice.actions

export default taskPageSlice.reducer