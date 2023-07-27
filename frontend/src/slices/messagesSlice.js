import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [],
  entities: {},
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action) {
      const { entities, ids } = action.payload;
      state.entities = entities;
      state.ids = ids;
    },
    addMessage(state, action) {
      const { message } = action.payload;
      state.entities[message.id] = message;
      state.ids.push(message.id);
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;