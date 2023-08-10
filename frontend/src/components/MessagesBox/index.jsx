import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { animateScroll } from 'react-scroll';
import { selectChannelById } from '../../slices/channelsSlice';
import MessageForm from '../MessageForm';
import { selectAllMessages } from '../../slices/messagesSlice';
import Message from '../Message';

const MessagesBox = () => {
  const { t } = useTranslation();
  const channel = useSelector((state) => {
    const { currentChannelId } = state.channels;
    return selectChannelById(state, currentChannelId);
  });
  const messages = useSelector(selectAllMessages);
  const messagesByChannel = messages.filter((message) => channel?.id === message.channelId);

  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'messages-box', delay: 0, duration: 0 });
  }, [messagesByChannel]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {channel?.name}
            </b>
          </p>
          <span className="text-muted">
            {t('chat.messageCount', { count: messagesByChannel.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagesByChannel.map((message) => <Message message={message} key={message.id} />)}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm channel={channel} />
        </div>
      </div>
    </div>
  );
};

export default MessagesBox;
