import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const initialState = {
  ids: [],
  entities: {},
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;

export const {
  selectAll: selectAllMessages
} = messagesAdapter.getSelectors(state => state.messages)

export default messagesSlice.reducer;