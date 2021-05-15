import { createSlice } from "@reduxjs/toolkit";

const taskPageSlice = createSlice({
  name: 'taskPage',
  initialState: {
    currentProject: {
      id: '',
      title: ''
    },
    groups: [
      {
        id: '0',
        title: 'group 1',
        isShowed: false,
        tasks: []
      },
      {
        id: '1',
        title: 'group 2',
        isShowed: false,
        tasks: []
      },
      {
        id: '2',
        title: 'group 3',
        isShowed: false,
        tasks: []
      },
      {
        id: '3',
        title: 'group 4',
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

      for (let i = 0; i < state.groups.length; i++) {
        const group = state.groups[i];
        group.tasks = [];
      }
    },
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    removeGroup: (state, action) => {
      state.groups = state.groups.filter((group) => group.id !== action.payload);
    },
    addTask: (state, action) => {
      const group = state.groups.filter((group) => group.id === action.payload.groupId)[0];
      const tasks = group.tasks as any[]
      tasks.push(action.payload["taskData"]);
    },
    removeTask: (state, action) => {
      const group = state.groups.filter((group) => group.id === action.payload.groupId)[0];
      group.tasks = group.tasks.filter((task) => task["id"] !== action.payload.taskId);
    },
    setTaskStatus: (state, action) => {
      const group = state.groups.filter((group) => group.id === action.payload.groupId)[0];
      const task = group.tasks.filter((item) => item["id"] === action.payload.taskId)[0];
      (task["status"] as any) = action.payload.status;
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