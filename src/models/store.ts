import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import menuSlice from "./slices/menuSlice";
import modalsSlice from "./slices/modalsSlice";
import profilePageSlice from "./slices/profilePageSlice";
import profileSlice from "./slices/profileSlice";
import projectsListSlice from "./slices/projectsListSlice";
import sidebarSlice from "./slices/sidebarSlice";
import tasksPageSlice from "./slices/tasksPageSlice";

const rootReducer = combineReducers({
  sidebar: sidebarSlice,
  menu: menuSlice,
  profile: profileSlice,
  projectsList: projectsListSlice,
  modals: modalsSlice,
  taskPage: tasksPageSlice,
  profilePage: profilePageSlice,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

export type RootState = ReturnType<typeof rootReducer>;