import React from "react"
import { hideModal, Modals, setCurrentGroup, setProjectPreviewShowed, setProjectImg, setProjectTitle, setTaskTitle, showModal } from "../models/slices/modalsSlice"

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

const hideProjectModal = () => (dispatch: any) => {
  dispatch(hideModal(Modals.PROJECT));
}

const setProjectTitleValue = (value: string) => (dispatch: any) => {
  dispatch(setProjectTitle(value));
} 

const loadImgToPreview = (e: React.ChangeEvent) => (dispatch: any) => {
  const input = e.currentTarget as HTMLInputElement;
  const imgFile = input.files?.item(0);
  const imgUrl = URL.createObjectURL(imgFile);

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
  hideProjectModal,
  setProjectTitleValue,
  loadImgToPreview,
  dropImgToPreview
}