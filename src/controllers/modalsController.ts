import { hideModal, Modals, showModal } from "../models/slices/modalsSlice"

/*
  Add task modal
*/
const showAddTaskModal = () => (dispatch: any) => {
  dispatch(showModal(Modals.ADD_TASK))
}

const hideAddTaskModal = () => (dispatch: any) => {
  dispatch(hideModal(Modals.ADD_TASK))
}

export { showAddTaskModal, hideAddTaskModal }