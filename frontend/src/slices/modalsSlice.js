import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  data: null
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      const { type, data } = payload;
      state.isOpened = true;
      state.type = type;
      state.data = data;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
