import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState({})

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const removedChannelId = payload;
        const messagesIds = Object.values(state.entities)
          .filter((message) => message.channelId === removedChannelId)
          .map((message) => message.id);
        messagesAdapter.removeMany(state, messagesIds);
      })
  },
});

export const { addMessage } = messagesSlice.actions;

export const {
  selectAll: selectAllMessages
} = messagesAdapter.getSelectors(state => state.messages)

export default messagesSlice.reducer;