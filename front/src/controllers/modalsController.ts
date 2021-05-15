import React from "react"
import { 
  hideModal, 
  Modals, 
  setCurrentGroup, 
  setProjectPreviewShowed, 
  setProjectImg, 
  setProjectTitle, 
  setTaskTitle, 
  showModal, 
  setSignInLogin, 
  setSignInPassword, 
  setSignUpLogin,
  setSignUpPassword,
  setSignUpValidPass,
  setProjectIsEdit,
  setEditableProjectId
} from "../models/slices/modalsSlice"
import { RootState } from "../models/store"

/*
  Add task modal
*/
const showAddTaskModal = (groupId: string) => (dispatch: any) => {
  dispatch(setCurrentGroup(groupId))
  dispatch(showModal(Modals.ADD_TASK))
}

const hideAddTaskModal = () => (dispatch: any) => {
  dispatch(hideModal(Modals.ADD_TASK))
}

const setTaskTitleValue = (value: string) => (dispatch: any) => {
  dispatch(setTaskTitle(value));
}  

export { 
  showAddTaskModal, 
  hideAddTaskModal,
  setTaskTitleValue,
}

/*
  Project modal
*/
const showProjectModal = () => (dispatch: any) => {
  dispatch(showModal(Modals.PROJECT));
}

const setProjectIsEditValue = (value: boolean) => (dispatch: any) => {
  dispatch(setProjectIsEdit(value));
}

const hideProjectModal = () => (dispatch: any) => {
  dispatch(dropImgToPreview());
  dispatch(setProjectTitleValue(""));
  dispatch(setProjectIsEdit(false));
  dispatch(setEditableProjectId(""));
  dispatch(hideModal(Modals.PROJECT));
}

const setProjectTitleValue = (value: string) => (dispatch: any) => {
  dispatch(setProjectTitle(value));
}

const setProjectModalToEdit = (id: string) => (dispatch: any, getState: any) => {
  const state: RootState = getState();
  const projectData = state.projectsList.projects.filter((project) => project["id"] === id)[0];

  dispatch(setEditableProjectId(id));
  dispatch(setProjectTitleValue(projectData["title"]));
  dispatch(loadImgToPreview(projectData["img"]));
  dispatch(setProjectIsEditValue(true));
  dispatch(showProjectModal());
}

const loadImgToPreview = (e: React.ChangeEvent | string) => (dispatch: any) => {
  let imgUrl = '';
  
  if (typeof e == 'string') {
    imgUrl = e;
  } else {
    const input = e.currentTarget as HTMLInputElement;
    const imgFile = input.files?.item(0);
    imgUrl = URL.createObjectURL(imgFile);
  }

  dispatch(setProjectImg(imgUrl));
  dispatch(setProjectPreviewShowed(true));
}

const dropImgToPreview = () => (dispatch: any) => {
  dispatch(setProjectPreviewShowed(false));
  setTimeout(() => {
    dispatch(setProjectImg(""));
  }, 1000)
}

export {
  showProjectModal,
  setProjectModalToEdit,
  setProjectIsEditValue,
  hideProjectModal,
  setProjectTitleValue,
  loadImgToPreview,
  dropImgToPreview
}

/* 
  Sign in modal
*/
const showSignInModal = () => (dispatch: any) => {
  dispatch(showModal(Modals.SIGN_IN));
}

const hideSignInModal = () => (dispatch: any) => {
  dispatch(hideModal(Modals.SIGN_IN));
}

const setSignInLoginValue = (value: string) => (dispatch: any) => {
  dispatch(setSignInLogin(value));
}

const setSignInPasswordValue = (value: string) => (dispatch: any) => {
  dispatch(setSignInPassword(value));
}

export {
  showSignInModal,
  hideSignInModal,
  setSignInLoginValue,
  setSignInPasswordValue,
}

/*
  Sign up modal
*/
const showSignUpModal = () => (dispatch: any) => {
  dispatch(showModal(Modals.SIGN_UP));
} 

const hideSignUpModal = () => (dispatch: any) => {
  dispatch(hideModal(Modals.SIGN_UP));
}

const setSignUpLoginValue = (value: string) => (dispatch: any) => {
  dispatch(setSignUpLogin(value));
}

const setSignUpPasswordValue = (value: string) => (dispatch: any) => {
  dispatch(setSignUpPassword(value));
}

const setSignUpValidPassValue = (value: string, className?: string, wrongClass?: string) => (dispatch: any, getState: any) => {
  const state: RootState = getState();
  const password = state.modals.modals[Modals.SIGN_UP].data.password as string;
  const input = document.querySelector(`.${className}`);

  if (wrongClass) {
    if (value !== password) {
      input?.classList.add(wrongClass);
    }
    else 
      input?.classList.remove(wrongClass);
  }

  dispatch(setSignUpValidPass(value));
}

export {
  showSignUpModal,
  hideSignUpModal,
  setSignUpLoginValue,
  setSignUpPasswordValue,
  setSignUpValidPassValue,
}