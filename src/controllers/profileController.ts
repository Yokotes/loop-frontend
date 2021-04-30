import { Modals } from "../models/slices/modalsSlice";
import { setUserImg, setUserName, setUserRole, setUserToken } from "../models/slices/profileSlice";
import { RootState } from "../models/store"
import { hideSignInModal, hideSignUpModal, setSignInLoginValue, setSignInPasswordValue, setSignUpLoginValue, setSignUpPasswordValue, setSignUpValidPassValue } from "./modalsController";

const signIn = () => (dispatch: any, getState: any) => {
  const state: RootState = getState();
  const modalData = state.modals.modals[Modals.SIGN_IN].data;
  
  // Checking if login and password aren't empty
  if (modalData.login === "" || modalData.password === "") {
    return
  }

  const userData = {
    login: modalData.login,
    password: modalData.password,
  }

  // Sending request to server
  // ...

  // Writting user to the state
  const user = {
    name: userData.login,
    role: "user",
    img: "img/default_avatar.jpg",
    token: "token",
  };

  // Profile slice
  dispatch(setUserImg(user.img));
  dispatch(setUserToken(user.token));
  dispatch(setUserName(user.name))
  dispatch(setUserRole(user.role));

  // Modal slice
  dispatch(setSignInLoginValue(""))
  dispatch(setSignInPasswordValue(""));
  dispatch(hideSignInModal());

  window.location.href = "/"
}

const signUp = () => (dispatch: any, getState: any) => {
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
  // ...

  // Writting user to the state
  const user = {
    name: userData.login,
    role: "user",
    img: "img/default_avatar.jpg",
    token: "token",
  };

  // Profile slice
  dispatch(setUserImg(user.img));
  dispatch(setUserToken(user.token));
  dispatch(setUserName(user.name))
  dispatch(setUserRole(user.role));

  // Modal slice
  dispatch(setSignUpPasswordValue(""));
  dispatch(setSignUpValidPassValue(""));
  dispatch(setSignUpLoginValue(""));
  dispatch(hideSignUpModal());

  window.location.href = "/"
}

export {
  signIn,
  signUp,
}