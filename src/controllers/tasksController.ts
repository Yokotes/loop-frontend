import { removeTask, toggleIsShowed } from "../models/slices/projectsListSlice"

const showTasks = (id: string) => (dispatch: any) => {
  dispatch(toggleIsShowed(id));
}

const deleteTask = (taskId: string, projectId: string) => (dispatch: any) => {
  dispatch(removeTask({
    taskId,
    projectId
  }));
}

export { showTasks, deleteTask }