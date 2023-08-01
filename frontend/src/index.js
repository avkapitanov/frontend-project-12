import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { store } from './slices/store';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import App from './App';
import { addMessage } from './slices/messagesSlice';
import { actions as channelActions } from './slices/channelsSlice';
import SocketProvider from './providers/SocketProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
const socketClient = io();

socketClient.on('newMessage', (payload) => {
  store.dispatch(addMessage(payload));
});

socketClient.on('newChannel', (payload) => {
  store.dispatch(channelActions.addChannel(payload));
});

socketClient.on('removeChannel', (payload) => {
  store.dispatch(channelActions.removeChannel(payload.id));
});

socketClient.on('renameChannel', (payload) => {
  const { id, name } = payload;
  store.dispatch(channelActions.updateChannel({ id, changes: { name } }));
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider socket={socketClient}>
        <App />
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);
