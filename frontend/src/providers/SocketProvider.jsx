import SocketContext from '../contexts/SocketContext.js';
import { useDispatch } from 'react-redux';
import { actions } from '../slices/channelsSlice';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const timeout = 4000;

  const sendMessage = (message) => {
    socket.emit('newMessage', message);
  };

  const addNewChannel = async (channel) => {
    const { data } = await socket
      .timeout(timeout)
      .emitWithAck('newChannel', channel);

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