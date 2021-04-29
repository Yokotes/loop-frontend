import { Modals } from "../models/slices/modalsSlice";
import { addItem } from "../models/slices/projectsListSlice";
import { RootState } from "../models/store"
import { dropImgToPreview, hideProjectModal, setProjectTitleValue } from "./modalsController";

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
  dispatch(dropImgToPreview());
  dispatch(setProjectTitleValue(""));
  dispatch(hideProjectModal());
}

export {
  addNewProject,
}