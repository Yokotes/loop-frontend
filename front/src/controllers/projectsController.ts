import axios from "axios";
import { Modals } from "../models/slices/modalsSlice";
import { addItem, changeProjectImg, changeProjectTitle, ProjectType, removeItem } from "../models/slices/projectsListSlice";
import { addTask, setCurrentProject } from "../models/slices/tasksPageSlice";
import { RootState } from "../models/store"
import { hideProjectModal } from "./modalsController";

const addNewProject = () => async (dispatch: any, getState: any) => {
  const state: RootState = getState();
  const userId = state.profile.currentUser._id;
  const token = state.profile.currentUser.token;
  const modalData = state.modals.modals[Modals.PROJECT].data;

  // Loading image
  let img: string | Blob = "img/default_project_img.jpg";
  if (modalData.projectImg) {
    img = await (await fetch(modalData.projectImg)).blob();
  }

  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("title", modalData.projectTitle as string);
  if (typeof img === "string") {
    formData.append("img", img);
  } else {
    formData.append("img", img, "img");
  }

  // Here comes server request
  const response = await axios.post(
    "http://localhost:5000/api/v1/project",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  // Add project to front-end side
  const project = response.data;

  dispatch(addItem(project));
  dispatch(hideProjectModal());
}

const removeProject = (id: string) => async (dispatch: any, getState: () => RootState) => {
  const state = getState();
  const token = state.profile.currentUser.token;
  
  await axios.delete(
    `http://localhost:5000/api/v1/project/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  dispatch(removeItem(id));
}

const setProjectData = () => async (dispatch: any, getState:() => RootState) => {
  const state = getState();
  const user = state.profile.currentUser;
  const modalState = state.modals.modals[Modals.PROJECT];
  const projectId = modalState.data.projectId;
  const currentProjectImg = (state.projectsList.projects.filter((item) => item["id"] === projectId)[0])["img"];
  const projectImg = modalState.data.projectImg as string;
  const projectTitle = modalState.data.projectTitle as string;

  // Loading image
  let img: string | Blob = projectImg === '' ? "img/default_project_img.jpg" : projectImg;

  if (currentProjectImg !== projectImg && projectImg !== "") {
    img = await (await fetch(projectImg)).blob();
  }

  // Construct form data
  const formData = new FormData();
  formData.append("title", projectTitle);
  formData.append("userId", user._id);
  if (typeof img === "string") {
    formData.append("img", img);
  } else {
    formData.append("img", img, "img");
  }

  // Sending request to the server
  await axios.put(
    `http://localhost:5000/api/v1/project/${projectId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  );

  dispatch(changeProjectImg({
    id: projectId,
    value: projectImg !== "" ? projectImg : "img/default_project_img.jpg"
  }));
  if (projectTitle !== '')
    dispatch(changeProjectTitle({
      id: projectId,
      value: projectTitle
    }));

  dispatch(hideProjectModal());
}

const loadProjects = () => async (dispatch: any, getState: () => RootState) => {
  const state = getState();
  const projects = state.projectsList.projects as ProjectType[];
  const user = state.profile.currentUser;

  const response = await axios.get(
    `http://localhost:5000/api/v1/project/user/${user._id}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  );

  const projectsArr: [] = response.data["projects"];

  if (projectsArr.length === projects.length) {
    return;
  }

  for (let i = 0; i < projectsArr.length; i++) {
    const inList = projects.filter((item) => item.id === projectsArr[i]["_id"]);
    if (inList.length === 0) {
      dispatch(addItem(projectsArr[i]));
    }
  }
}

const setCurrentProjectAndLoadTasks = (id: string, title: string) => async (dispatch: any, getState: () => RootState) => {
  const state = getState();
  const token = state.profile.currentUser.token;

  // Set current project at tasks page
  dispatch(setCurrentProject({
    id,
    title
  }));

  // Load tasks
  const tasks = await axios.get(
    `http://localhost:5000/api/v1/task/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  dispatch(fillTasks(tasks.data.tasks))
}

const fillTasks = (tasks: []) => (dispatch: any) => {
  tasks.map((task) => (
    dispatch(addTask({
      groupId: task["group"],
      taskData: {
        id: task["_id"],
        title: task["title"],
        status: task["status"],
      }
    }))
  ));
} 

export {
  addNewProject,
  removeProject,
  setProjectData,
  loadProjects,
  setCurrentProjectAndLoadTasks
}