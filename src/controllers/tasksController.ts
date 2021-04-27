import { dropCurrentGroup, Modals } from "../models/slices/modalsSlice";
import { addTask, removeTask, setTaskStatus } from "../models/slices/tasksPageSlice";
import { RootState } from "../models/store";
import { hideAddTaskModal } from "./modalsController";

const addNewTask = () => (dispatch: any, getState: any) => {
  const state: RootState = getState();
  const taskModal = state.modals.modals[Modals.ADD_TASK]

  // Add task to database
  // ...
  
  // Getting id
  const groupId = taskModal.data.currentGroupId;
  const tasksList = state.taskPage.groups.filter((item) => item.id === groupId)[0];
  const id = tasksList.tasks.length.toString()

  // Add task to front-end side
  const taskData = {
    id,
    title: taskModal.data.taskTitle,
    status: 1
  }

  dispatch(addTask({
    groupId,
    taskData
  }));
  dispatch(dropCurrentGroup());
  dispatch(hideAddTaskModal())
}

const deleteTask = (taskId: string, groupId: string) => (dispatch: any) => {
  dispatch(removeTask({
    taskId,
    groupId
  }));
}

const changeStatus = (status: number, taskId: string, groupId: string) => (dispatch: any) => {
  dispatch(setTaskStatus({
    groupId,
    taskId,
    status
  }))
}

export { deleteTask, addNewTask, changeStatus }