import { hideModal, Modals, setCurrentProject, setTaskTitle, showModal } from "../models/slices/modalsSlice"

/*
  Add task modal
*/
const showAddTaskModal = (projectId: string) => (dispatch: any) => {
  dispatch(setCurrentProject(projectId));
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