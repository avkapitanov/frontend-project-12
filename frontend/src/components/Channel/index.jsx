import React from 'react';
import cn from 'classnames';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as modalsActions } from '../../slices/modalsSlice';

const Channel = ({ channel, activeChannelId, handleChoose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleChannelRemove = (channelId) => () => {
    dispatch(modalsActions.openModal({ type: 'removeChannel', data: { channelId } }));
  };

  const handleChannelRename = (channelId) => () => {
    dispatch(modalsActions.openModal({ type: 'renameChannel', data: { channelId } }));
  };

  const isActive = activeChannelId === channel.id;
  const buttonVariant = isActive ? 'secondary' : null;
  const channelBtnClasses = cn(
    'w-100 rounded-0 text-start text-truncate btn',
    {
      'btn-secondary': isActive,
    },
  );

  return (
    <li className="nav-item w-100">
      {channel.removable
        ? (
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button
              type="button"
              key={channel.id}
              className={channelBtnClasses}
              onClick={handleChoose}
              variant={buttonVariant}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
            <Dropdown.Toggle split className="flex-grow-0" variant={buttonVariant}>
              <span className="visually-hidden">{t('channels.menu')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleChannelRename(channel.id)}>{t('channels.rename')}</Dropdown.Item>
              <Dropdown.Item onClick={handleChannelRemove(channel.id)}>{t('channels.remove')}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : (
          <button
            type="button"
            className={channelBtnClasses}
            onClick={handleChoose}
            variant={buttonVariant}
          >
            <span className="me-1">#</span>
            {channel.name}
          </button>
        )}
    </li>
  );
};

export default Channel;
