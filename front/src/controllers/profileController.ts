import axios from "axios";
import React from "react";
import { Modals } from "../models/slices/modalsSlice";
import { setImg, setPassword, setUsername } from "../models/slices/profilePageSlice";
import { setUserToken } from "../models/slices/profileSlice";
import { setGroupTitle } from "../models/slices/tasksPageSlice";
import { RootState } from "../models/store"
import { hideSignInModal, hideSignUpModal, setSignInLoginValue, setSignInPasswordValue, setSignUpLoginValue, setSignUpPasswordValue, setSignUpValidPassValue } from "./modalsController";

const signIn = () => async (dispatch: any, getState: any) => {
  const state: RootState = getState();
  const modalData = state.modals.modals[Modals.SIGN_IN].data;
  
  // Checking if login and password aren't empty
  if (modalData.login === "" || modalData.password === "") {
    return
  }

  const userData = {
    username: modalData.login,
    password: modalData.password,
  }

  // Sending request to server
  const response = await axios.post(
    "http://localhost:5000/api/v1/user/login",
    userData
  );

  localStorage.setItem("token", response.data.token);

  // Modal slice
  dispatch(setSignInLoginValue(""))
  dispatch(setSignInPasswordValue(""));
  dispatch(hideSignInModal());

  window.location.href = "/"
}

const signUp = () => async (dispatch: any, getState: any) => {
  const state: RootState = getState();
  const modalData = state.modals.modals[Modals.SIGN_UP].data;
  
  // Checking if login and password aren't empty
  if (modalData.login === "" || modalData.password === "") {
    return
  }

  const userData = {
    login: modalData.login,
    password: modalData.password,
  }
  
  // Sending request to server
  const res = await axios.post(
    "http://localhost:5000/api/v1/user",
    {
      username: userData.login,
      password: userData.password,
    }
  );

  localStorage.setItem("token", res.data.token);

  // Modal slice
  dispatch(setSignUpPasswordValue(""));
  dispatch(setSignUpValidPassValue(""));
  dispatch(setSignUpLoginValue(""));
  dispatch(hideSignUpModal());

  // window.location.href = "/"
}

export {
  signIn,
  signUp,
}

/*
  Profile page
*/
const setGroupTitleValue = (groupId: string, value: string) => (dispatch: any) => {
  dispatch(setGroupTitle({
    value,
    groupId
  }));
}

const setUsernameValue = (value: string) => (dispatch: any) => {
  dispatch(setUsername(value));
}

const setPasswordValue = (value: string) => (dispatch: any) => {
  dispatch(setPassword(value));
} 

const setImgValue = (e: React.ChangeEvent | string) => (dispatch: any) => {
  let img = "";

  if (typeof e === 'string') {
    img = e;
  } else {
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files?.item(0);
    img = URL.createObjectURL(file);
  }
  
  dispatch(setImg(img))
}

const applyProfileSettings = () => async (dispatch: any, getState: any) => {
  const state: RootState = getState();
  const user = state.profile.currentUser;
  const profilePageState = state.profilePage.pageData;
  let img: Blob | string = "";

  // Loading image
  if (profilePageState.img !== user.img) {
    img = await (await fetch(profilePageState.img)).blob();
  }

  const formData = new FormData();
  formData.append("name", profilePageState.username);
  formData.append("password", profilePageState.password ?? false);
  formData.append("group1", "1");
  formData.append("group2", "2");
  formData.append("group3", "3");
  formData.append("group4", "4");
  formData.append("img", img, "img");

  // Sending request to the server
  const response = await axios.put(
    `http://localhost:5000/api/v1/user/${user._id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "content-type": "multipart/form-data"
      }
    }
  )

  // Applying profile setting to Front-end
  // localStorage.setItem("token", response.data.token);
  // dispatch(setUserToken(response.data.token));
}

export {
  setGroupTitleValue,
  applyProfileSettings,
  setImgValue,
  setPasswordValue,
  setUsernameValue,
}