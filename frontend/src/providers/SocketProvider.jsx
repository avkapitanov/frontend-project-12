import SocketContext from '../contexts/SocketContext.js';

const SocketProvider = ({ socket, children }) => {
  const sendMessage = (message) => {
    socket.emit('newMessage', message);
  };

  return (
    <SocketContext.Provider value={{
      sendMessage
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;