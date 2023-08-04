import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import SocketContext from '../contexts/SocketContext.js';
import { actions } from '../slices/channelsSlice';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const timeout = 4000;

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
      .emitWithAck('removeChannel', { id });
  };

  const renameChannel = async (id, name) => {
    await socket
      .timeout(timeout)
      .emitWithAck('renameChannel', { id, name });
  };

  const contextValue = useMemo(
    () => ({
      sendMessage, addNewChannel, removeChannel, renameChannel,
    }),
    [sendMessage, addNewChannel, removeChannel, renameChannel],
  );

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
