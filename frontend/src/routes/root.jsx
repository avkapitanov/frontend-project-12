import { useAuth } from '../hooks/useAuth';
import { fetchChannels, selectChannelById } from '../slices/channelsSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelsList from '../components/ChannelsList';
import MessageForm from '../components/MessageForm';
import { selectAllMessages } from '../slices/messagesSlice';
import Message from '../components/Message';
import ModalWrapper from '../components/ModalWrapper';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import routes from '../routes';
import { useNavigate } from 'react-router-dom';
import { useRollbar } from '@rollbar/react';
import { animateScroll } from 'react-scroll';

export default function Root() {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const auth = useAuth();
  const token = auth.getToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const channel = useSelector((state) => {
    const { currentChannelId } = state.channels;
    return selectChannelById(state, currentChannelId);
  });
  const messages = useSelector(selectAllMessages);
  const messagesByChannel = messages.filter((message) => channel.id === message.channelId);
  const loadingStatus = useSelector((state) => state.channels.loadingStatus);

  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'messages-box', delay: 0, duration: 0 });
  }, [messages]);

  useEffect(() => {
    dispatch(fetchChannels(token));
  }, [token, dispatch]);

  useEffect(() => {
    if (loadingStatus === 'authError') {
      auth.logOut();
      navigate(routes.loginPath());
      rollbar.error('FetchChannels', loadingStatus);
      toast.error(t(`error.${loadingStatus}`));
    }

    if (loadingStatus === 'failed') {
      rollbar.error('FetchChannels', loadingStatus);
      toast.error(t(`error.${loadingStatus}`));
    }
  }, [loadingStatus, auth, navigate, t]);

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelsList />
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small"><p className="m-0"><b># {channel?.name}</b></p><span
                className="text-muted">
                {t('chat.messageCount', { count: messagesByChannel.length })}
              </span></div>
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