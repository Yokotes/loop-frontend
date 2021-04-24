import { dropCurrentProject, Modals } from "../models/slices/modalsSlice";
import { addTask, removeTask, toggleIsShowed } from "../models/slices/projectsListSlice"
import { RootState } from "../models/store";
import { hideAddTaskModal } from "./modalsController";

const showTasks = (id: string) => (dispatch: any) => {
  dispatch(toggleIsShowed(id));
}

const addNewTask = () => (dispatch: any, getState: any) => {
  const state: RootState = getState();
  const taskModal = state.modals.modals[Modals.ADD_TASK]

  // Add task to database
  // ...
  
  // Getting id
  const tasksList = state.projectsList.projects.filter((item) => item.id === projectId)[0].tasks
  const id = tasksList.length.toString()

  // Add task to front-end side
  const taskData = {
    id,
    title: taskModal.data.taskTitle,
    status: 1
  }
  const projectId = taskModal.data.currentProjectId;

  dispatch(addTask({
    projectId,
    taskData
  }));
  dispatch(dropCurrentProject());
  dispatch(hideAddTaskModal())
}

const deleteTask = (taskId: string, projectId: string) => (dispatch: any) => {
  dispatch(removeTask({
    taskId,
    projectId
  }));
}

export { showTasks, deleteTask, addNewTask }