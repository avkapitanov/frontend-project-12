import { useMemo } from 'react';
import SocketApiContext from '../contexts/SocketApiContext';

const SocketApiProvider = ({ socket, children }) => {
  const withAcknowledgement = (operation, ...args) => new Promise((resolve, reject) => {
    socket.emit(operation, ...args, (response) => {
      if (response.status !== 'ok') {
        reject();
      }
      resolve(response.data);
    });
  });

  const api = {
    sendMessage: (...args) => withAcknowledgement('newMessage', ...args),
    addNewChannel: (...args) => withAcknowledgement('newChannel', ...args),
    removeChannel: (...args) => withAcknowledgement('removeChannel', ...args),
    renameChannel: (...args) => withAcknowledgement('renameChannel', ...args),
  };

  const contextValue = useMemo(
    () => api,
    [api],
  );

  return (
    <SocketApiContext.Provider value={contextValue}>
      {children}
    </SocketApiContext.Provider>
  );
};

export default SocketApiProvider;
