import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import React from 'react';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import resources from './locales/index';
import store from './slices/store';
import { addMessage } from './slices/messagesSlice';
import { actions as channelActions } from './slices/channelsSlice';
import SocketProvider from './providers/SocketProvider';
import App from './App';
import AuthProvider from './providers/AuthProvider';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const init = async () => {
  await i18next
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

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

  leoProfanity.add(leoProfanity.getDictionary('en'));
  leoProfanity.add(leoProfanity.getDictionary('ru'));

  return (
    <Provider store={store}>
      <SocketProvider socket={socketClient}>
        <AuthProvider>
          <RollbarProvider config={rollbarConfig}>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </RollbarProvider>
        </AuthProvider>
      </SocketProvider>
    </Provider>
  );
};

export default init;
