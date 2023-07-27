import React from 'react';
import cn from 'classnames';

const Channel = (props) => {
  const {
    channel,
    activeChannelId,
  } = props;

  const isActive = activeChannelId === channel.id;
  const channelBtnClasses = cn(
    'w-100 rounded-0 text-start btn',
    {
      'btn-secondary': isActive,
    },
  );

  return (
    <li className="nav-item w-100">
      <button type="button" className={channelBtnClasses}><span
        className="me-1">#</span>{channel.name}
      </button>
    </li>
  );
};

export default Channel;