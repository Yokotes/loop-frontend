import { Modals } from "../models/slices/modalsSlice";
import { addItem, changeProjectImg, changeProjectTitle, removeItem } from "../models/slices/projectsListSlice";
import { RootState } from "../models/store"
import { hideProjectModal } from "./modalsController";

const addNewProject = () => (dispatch: any, getState: any) => {
  const state: RootState = getState();
  const modalData = state.modals.modals[Modals.PROJECT].data;
  const newId = state.projectsList.projects.length;

  // Here comes server request
  // ...

  // Add project to front-end side
  const img = (
    modalData.projectImg !== "" ? modalData.projectImg : "img/default_project_img.jpg"
  )
  const projectData = {
    id: newId.toString(),
    title: modalData.projectTitle,
    img
  }

  dispatch(addItem(projectData));
  dispatch(hideProjectModal());
}

const removeProject = (id: string) => (dispatch: any) => {
  dispatch(removeItem(id));
}

const setProjectData = () => (dispatch: any, getState:() => RootState) => {
  const state = getState();
  const modalState = state.modals.modals[Modals.PROJECT];
  const projectId = modalState.data.projectId;
  const projectImg = modalState.data.projectImg;
  const projectTitle = modalState.data.projectTitle;

  if (projectImg !== '')
    dispatch(changeProjectImg({
      id: projectId,
      value: projectImg
    }));
  if (projectTitle !== '')
    dispatch(changeProjectTitle({
      id: projectId,
      value: projectTitle
    }));

  dispatch(hideProjectModal());
}

export {
  addNewProject,
  removeProject,
  setProjectData,
}