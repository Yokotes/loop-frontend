import { createSlice } from "@reduxjs/toolkit";

const profilePageSlice = createSlice({
  name: 'profilePage',
  initialState: {
    pageData: {
      username: '',
      password: '',
      validPassword: '',
      img: '',
    }
  },
  reducers: {
    setUsername: (state, action) => {
      state.pageData.username = action.payload;
    },
    setPassword: (state, action) => {
      state.pageData.password = action.payload;
    },
    setValidPassword: (state, action) => {
      state.pageData.validPassword = action.payload;
    },
    setImg: (state, action) => {
      state.pageData.img = action.payload;
    }
  }
});

export const { 
  setUsername, 
  setPassword, 
  setValidPassword,
  setImg, 
} = profilePageSlice.actions;

export default profilePageSlice.reducer;