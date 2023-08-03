import SocketContext from '../contexts/SocketContext.js';
import { useDispatch } from 'react-redux';
import { actions } from '../slices/channelsSlice';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const timeout = 4000;

  const withAcknowledgement = (socketFunc) => (...args) => new Promise((resolve, reject) => {
    let state = 'pending';
    const timer = setTimeout(() => {
      state = 'rejected';
      reject();
    }, 3000);

    socketFunc(...args, (response) => {
      if (state !== 'pending') return;

      clearTimeout(timer);

      if (response.status === 'ok') {
        state = 'resolved';
        resolve(response.data);
      }

      reject();
    });
  });

  const api = {
    sendMessage: withAcknowledgement((...args) => socket.volatile.emit('newMessage', ...args)),
    createChannel: withAcknowledgement((...args) => socket.volatile.emit('newChannel', ...args)),
    renameChannel: withAcknowledgement((...args) => socket.volatile.emit('renameChannel', ...args)),
    removeChannel: withAcknowledgement((...args) => socket.volatile.emit('removeChannel', ...args)),
  };

  const sendMessage = async (message) => {
    await socket
      .timeout(timeout)
      .emitWithAck('newMessage', message);
  };

  const addNewChannel = async (channel) => {
    const { data } = await socket
      .timeout(timeout)
      .emitWithAck('newChannel', channel);

    dispatch(actions.addChannel(data));
    dispatch(actions.setCurrentChannelId(data.id));
  };

  const removeChannel = async (id) => {
    await socket
      .timeout(timeout)
      .emit('removeChannel', { id });
  };

  const renameChannel = async (id, name) => {
    await socket
      .timeout(timeout)
      .emit('renameChannel', { id, name });
  };

  return (
    <SocketContext.Provider value={{
      sendMessage,
      addNewChannel,
      removeChannel,
      renameChannel
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;