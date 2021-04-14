import { applyMiddleware, combineReducers, createStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import menuSlice from "./slices/menuSlice";
import sidebarSlice from "./slices/sidebarSlice";

const rootReducer = combineReducers({
  sidebar: sidebarSlice,
  menu: menuSlice,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

export type RootState = ReturnType<typeof rootReducer>;