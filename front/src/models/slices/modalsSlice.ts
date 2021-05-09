import { createSlice } from "@reduxjs/toolkit";

enum Modals {
  ADD_TASK = 0,
  PROJECT = 1,
  SIGN_IN = 2,
  SIGN_UP = 3,
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
        isShow: false,
        data: {
          projectTitle: '',
          projectImg: '',
          previewShowed: false,
          isEdit: false,
          projectId: '',
        }
      },
      {
        name: 'signIn',
        isShow: false,
        data: {
          login: '',
          password: '',
        }
      },
      {
        name: 'signUp',
        isShow: false,
        data: {
          login: '',
          password: '',
          validPassword: '',
        }
      },
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
    setProjectIsEdit: (state, action) => {
      state.modals[Modals.PROJECT].data.isEdit = action.payload;
    },
    setEditableProjectId: (state, action) => {
      state.modals[Modals.PROJECT].data.projectId = action.payload;
    },

    // SignIn modal
    setSignInLogin: (state, action) => {
      state.modals[Modals.SIGN_IN].data.login = action.payload;
    },
    setSignInPassword: (state, action) => {
      state.modals[Modals.SIGN_IN].data.password = action.payload;
    },

    // Sign up modal
    setSignUpLogin: (state, action) => {
      state.modals[Modals.SIGN_UP].data.login = action.payload;
    },
    setSignUpPassword: (state, action) =>{
      state.modals[Modals.SIGN_UP].data.password = action.payload;
    },
    setSignUpValidPass: (state, action) => {
      state.modals[Modals.SIGN_UP].data.validPassword = action.payload;
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
  setProjectIsEdit,
  setProjectTitle,
  setProjectPreviewShowed,
  setEditableProjectId,
  setSignInLogin,
  setSignInPassword,
  setSignUpLogin,
  setSignUpPassword,
  setSignUpValidPass,
} = modalsSlice.actions

export default modalsSlice.reducer;