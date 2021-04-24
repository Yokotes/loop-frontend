import { createSlice } from "@reduxjs/toolkit";

enum Modals {
  ADD_TASK = 0,
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    modals: [
      {
        name: 'addTask',
        isShow: false,
        data: {
          taskTitle: '',
          currentProjectId: '',
        }
      },
    ],
  },
  reducers: {
    // Add task modal
    setCurrentProject: (state, action) => {
      state.modals[Modals.ADD_TASK].data.currentProjectId = action.payload;
    },
    dropCurrentProject: (state) => {
      state.modals[Modals.ADD_TASK].data.currentProjectId = '';
    },
    setTaskTitle: (state, action) => {
      state.modals[Modals.ADD_TASK].data.taskTitle = action.payload;
    },

    // General
    showModal: (state, action) => {
      const modal = state.modals[action.payload];
      modal.isShow = true;
    },

    hideModal: (state, action) => {
      const modal = state.modals[action.payload];
      modal.isShow = false;
    }
  }
});

export { Modals }

export const { 
  showModal, 
  hideModal,
  setCurrentProject,
  dropCurrentProject,
  setTaskTitle,
} = modalsSlice.actions

export default modalsSlice.reducer;