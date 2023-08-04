import { useDispatch, useSelector } from 'react-redux';
import { selectAllChannels, actions as channelActions } from '../../slices/channelsSlice';

import Channel from '../Channel';

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectAllChannels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const handleChannelChoose = (id) => () => {
    dispatch(channelActions.setCurrentChannelId(id));
  };

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <Channel
          key={channel.id}
          channel={channel}
          activeChannelId={currentChannelId}
          handleChoose={handleChannelChoose(channel.id)}
        />
      ))}
    </ul>
  );
};

export default ChannelsBox;
