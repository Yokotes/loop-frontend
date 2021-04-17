import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    currentUser: {
      name: 'default',
      img: 'img/default_avatar.jpg',
      role: 'user',
      token: 'default-token',
    }
  },
  reducers: {
    setUserName: (state, action) => {
      state.currentUser.name = action.payload;
    },
    setUserToken: (state, action) => {
      state.currentUser.token = action.payload;
    },
    setUserRole: (state, action) => {
      const role: 'user' | 'manager' = action.payload;
      state.currentUser.role = role;
    },
    setUserImg: (state, action) => {
      state.currentUser.img = action.payload;
    }
  }
});

export const { setUserName, setUserImg, setUserToken } = profileSlice.actions;

export default profileSlice.reducer;