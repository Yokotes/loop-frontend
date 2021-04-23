import { createSlice } from "@reduxjs/toolkit";

enum Modals {
  ADD_TASK = 0,
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    modals: [
      {
        name: 'addTask',
        isShow: true,
      },
    ],
  },
  reducers: {
    showModal: (state, action) => {
      const modal = state.modals[action.payload];
      modal.isShow = true;
    },

    hideModal: (state, action) => {
      const modal = state.modals[action.payload];
      modal.isShow = false;
    }
  }
});

export { Modals }

export const { showModal, hideModal } = modalsSlice.actions

export default modalsSlice.reducer;