/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const getChannels = (token) => axios.get(routes.api.dataPath(), {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchChannels = createAsyncThunk(
  'channels/fetchTasks',
  async (token, thunkAPI) => {
    try {
      const { data } = await getChannels(token);
      return data;
    } catch (error) {
      if (error.isAxiosError) {
        return thunkAPI.rejectWithValue(error.response);
      }
      throw error;
    }
  },
);

const channelsAdapter = createEntityAdapter();

export const defaultChannelId = 1;

const initialState = channelsAdapter.getInitialState({
  currentChannelId: defaultChannelId,
  loadingStatus: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
      if (state.currentChannelId === payload) {
        state.currentChannelId = defaultChannelId;
      }
    },
    updateChannel: channelsAdapter.updateOne,
    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        channelsAdapter.upsertMany(state, channels);
        state.currentChannelId = currentChannelId;
      })
      .addCase(fetchChannels.rejected, (state, { payload }) => {
        state.loadingStatus = (payload?.status === 401) ? 'authError' : 'networkError';
      });
  },
});

export const {
  selectAll: selectAllChannels,
  selectById: selectChannelById,
} = channelsAdapter.getSelectors((state) => state.channels);

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
