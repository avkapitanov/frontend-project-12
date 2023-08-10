import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useRollbar } from '@rollbar/react';
import useAuth from '../hooks/useAuth';
import { fetchChannels } from '../slices/channelsSlice';
import ChannelsList from '../components/ChannelsList';
import ModalWrapper from '../components/ModalWrapper';
import routes from '../routes';
import MessagesBox from '../components/MessagesBox';

const Root = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const auth = useAuth();
  const token = auth.getToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingStatus = useSelector((state) => state.channels.loadingStatus);

  useEffect(() => {
    dispatch(fetchChannels(token));
  }, [token, dispatch]);

  useEffect(() => {
    console.error(loadingStatus);
    if (loadingStatus === 'authError' || loadingStatus === 'networkError') {
      auth.logOut();
      navigate(routes.loginPath());
      rollbar.error('FetchChannels', loadingStatus);
      toast.error(t(`error.${loadingStatus}`));
    }
  }, [loadingStatus, auth, navigate, t, rollbar]);

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelsList />
          <MessagesBox />
        </div>
      </div>
      <ModalWrapper />
    </>
  );
};

export default Root;
