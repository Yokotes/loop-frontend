import { createSlice } from "@reduxjs/toolkit";

enum Modals {
  ADD_TASK = 0,
  PROJECT = 1,
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
          currentGroupId: '',
        }
      },
      {
        name: 'project',
        isShow: true,
        data: {
          projectTitle: '',
          projectImg: '',
          previewShowed: false,
        }
      }
    ],
  },
  reducers: {
    // Add task modal
    setCurrentGroup: (state, action) => {
      state.modals[Modals.ADD_TASK].data.currentGroupId = action.payload;
    },
    dropCurrentGroup: (state) => {
      state.modals[Modals.ADD_TASK].data.currentGroupId = '';
    },
    setTaskTitle: (state, action) => {
      state.modals[Modals.ADD_TASK].data.taskTitle = action.payload;
    },

    // Project modal
    setProjectImg: (state, action) => {
      state.modals[Modals.PROJECT].data.projectImg = action.payload;
    },
    setProjectTitle: (state, action) => {
      state.modals[Modals.PROJECT].data.projectTitle = action.payload;
    },
    setProjectPreviewShowed: (state, action) => {
      state.modals[Modals.PROJECT].data.previewShowed = action.payload;
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
  setCurrentGroup,
  dropCurrentGroup,
  setTaskTitle,
  setProjectImg,
  setProjectTitle,
  setProjectPreviewShowed,
} = modalsSlice.actions

export default modalsSlice.reducer;