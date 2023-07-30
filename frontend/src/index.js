import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { store } from './slices/store';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import App from './App';
import { addMessage } from './slices/messagesSlice';
import SocketProvider from './providers/SocketProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
const socketClient = io();

socketClient.on('newMessage', (payload) => {
  store.dispatch(addMessage(payload));
});

root.render(
  <React.StrictMode>
    <SocketProvider socket={socketClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </SocketProvider>
  </React.StrictMode>
);
