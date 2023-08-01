import { useAuth } from '../hooks/useAuth';
import { fetchChannels, selectChannelById } from '../slices/channelsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelsList from '../components/ChannelsList';
import MessageForm from '../components/MessageForm';
import { selectAllMessages } from '../slices/messagesSlice';
import Message from '../components/Message';
import ModalWrapper from '../components/ModalWrapper';

export default function Root() {
  const auth = useAuth();
  const token = auth.getToken();
  const dispatch = useDispatch();
  const channel = useSelector((state) => {
    const { currentChannelId } = state.channels;
    return selectChannelById(state, currentChannelId);
  });
  const messages = useSelector(selectAllMessages);
  const messagesByChannel = messages.filter((message) => channel.id === message.channelId);

  useEffect(() => {
    dispatch(fetchChannels(token))
      .then(({ error }) => {

      })
      .catch(() => {

      });
  }, []);
  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelsList />
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small"><p className="m-0"><b># {channel?.name}</b></p><span
                className="text-muted">{messagesByChannel.length} сообщений</span></div>
              <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                {messagesByChannel.map((message) => <Message message={message} key={message.id} />)}
              </div>
              <div className="mt-auto px-5 py-3">
                <MessageForm channel={channel}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalWrapper />
    </>
  );
}