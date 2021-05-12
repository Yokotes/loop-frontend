import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    currentUser: {
      _id: '',
      name: '',
      img: '',
      role: '',
      token: '',
    }
  },
  reducers: {
    setUserId: (state, action) => {
      state.currentUser._id = action.payload;
    },
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

export const { 
  setUserName, 
  setUserImg, 
  setUserToken,
  setUserRole,
  setUserId
} = profileSlice.actions;

export default profileSlice.reducer;