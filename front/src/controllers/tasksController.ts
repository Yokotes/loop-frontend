import axios from "axios";
import { dropCurrentGroup, Modals } from "../models/slices/modalsSlice";
import { addTask, removeTask, setTaskStatus } from "../models/slices/tasksPageSlice";
import { RootState } from "../models/store";
import { hideAddTaskModal, setTaskTitleValue } from "./modalsController";

const addNewTask = () => async (dispatch: any, getState: any) => {
  const state: RootState = getState();
  const taskModal = state.modals.modals[Modals.ADD_TASK];
  const user = state.profile.currentUser;
  const projectId = state.taskPage.currentProject.id;

  // Add task to database
  const taskData = {
    title: taskModal.data.taskTitle,
    group: taskModal.data.currentGroupId,
    userId: user._id,
    projectId,
  }

  const response = await axios.post(
    "http://localhost:5000/api/v1/task",
    taskData,
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  );

  // Add task to front-end side
  const task = response.data.task;

  dispatch(addTask({
    groupId: task.group,
    taskData: {
      id: task._id,
      title: task.title,
      status: task.status,
    }
  }));
  dispatch(dropCurrentGroup());

  dispatch(setTaskTitleValue(""));
  dispatch(hideAddTaskModal());
}

const deleteTask = (taskId: string, groupId: string) => async (dispatch: any, getState: () => RootState) => {
  const state = getState();
  const token = state.profile.currentUser.token;
  
  await axios.delete(
    `http://localhost:5000/api/v1/task/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  dispatch(removeTask({
    taskId,
    groupId
  }));
}

const changeStatus = (status: number, taskId: string, groupId: string) => async (dispatch: any, getState: () => RootState) => {
  const state = getState();
  const user = state.profile.currentUser;

  const response = await axios.put(
    `http:///localhost:5000/api/v1/task/${taskId}`,
    {
      status,
      userId: user._id 
    },
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  );

  const newStatus: number = response.data.status;

  dispatch(setTaskStatus({
    groupId,
    taskId,
    status: newStatus
  }))
}

export { deleteTask, addNewTask, changeStatus }