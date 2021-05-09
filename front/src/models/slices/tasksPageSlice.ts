import { createSlice } from "@reduxjs/toolkit";

const taskPageSlice = createSlice({
  name: 'taskPage',
  initialState: {
    currentProject: {
      id: '0',
      title: '404'
    },
    groups: [
      {
        id: '0',
        title: 'Right now',
        isShowed: false,
        tasks: [
          {
            id: '0',
            title: 'Do awesome stuff',
            status: 3
          }
        ]
      },
      {
        id: '1',
        title: 'Whatever',
        isShowed: false,
        tasks: []
      },
      {
        id: '2',
        title: 'Something else',
        isShowed: false,
        tasks: []
      },
      {
        id: '3',
        title: 'New',
        isShowed: false,
        tasks: []
      },
    ]
  },
  reducers: {
    setGroupTitle: (state, action) => {
      const group = state.groups.filter((group) => group.id === action.payload.groupId)[0];
      group.title = action.payload.value;
    },
    setCurrentProject: (state, action) => {
      state.currentProject.id = action.payload.id;
      state.currentProject.title = action.payload.title
      state.groups = [];
    },
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    removeGroup: (state, action) => {
      state.groups = state.groups.filter((group) => group.id !== action.payload);
    },
    addTask: (state, action) => {
      const group = state.groups.filter((group) => group.id === action.payload.groupId)[0];
      group.tasks.push(action.payload.taskData);
    },
    removeTask: (state, action) => {
      const group = state.groups.filter((group) => group.id === action.payload.groupId)[0];
      group.tasks = group.tasks.filter((task) => task.id !== action.payload.taskId);
    },
    setTaskStatus: (state, action) => {
      const group = state.groups.filter((group) => group.id === action.payload.groupId)[0];
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
  setGroupTitle,
  setCurrentProject,
  addGroup,
  removeGroup, 
  addTask,  
  removeTask,
  setTaskStatus,
  toggleShowed,
} = taskPageSlice.actions

export default taskPageSlice.reducer