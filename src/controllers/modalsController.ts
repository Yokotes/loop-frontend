import { hideModal, Modals, setCurrentGroup, setTaskTitle, showModal } from "../models/slices/modalsSlice"

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

export {
  showProjectModal,
  hideProjectModal,
}