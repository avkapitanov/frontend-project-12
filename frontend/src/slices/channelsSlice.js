import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { getChannels } from '../api';

export const fetchChannels = createAsyncThunk(
  'channels/fetchTasks',
  async (token) => {
    const { data } = await getChannels(token);

    return data;
  },
);

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
})

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.upsertMany(state, channels)
        state.currentChannelId = currentChannelId;
      });
  },
});

export const {
  selectAll: selectAllChannels,
} = channelsAdapter.getSelectors(state => state.channels)

export const { actions } = channelsSlice;
export default channelsSlice.reducer;