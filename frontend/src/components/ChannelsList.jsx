import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as modalsActions } from '../slices/modalsSlice';

import ButtonAddChannel from './ButtonAddChannel';
import ChannelsBox from './ChannelsBox';

const ChannelsList = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleAddChannelModal = () => {
    dispatch(modalsActions.openModal({ type: 'addChannel' }));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <ButtonAddChannel handleAddChannelModal={handleAddChannelModal} />
      </div>
      <ChannelsBox />
    </div>
  );
};

export default ChannelsList;
