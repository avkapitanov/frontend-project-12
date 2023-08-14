import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Form, ModalBody, ModalHeader, ModalTitle,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';
import cn from 'classnames';
import channelSchema from '../validation/channelSchema';
import useSocketApi from '../hooks/useSocketApi';
import {
  selectAllChannels, selectChannelById,
} from '../slices/channelsSlice';
import ButtonClose from './ButtonClose';

const ModalRenameChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const channels = useSelector(selectAllChannels);
  const channelId = useSelector((state) => state.modals.data?.channelId);
  const channel = useSelector((state) => selectChannelById(state, channelId));
  const inputRef = useRef();
  const api = useSocketApi();
  const [renameError, setRenameError] = useState(false);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  const f = useFormik({
    initialValues: { name: channel.name },
    validationSchema: channelSchema(channels, t),
    onSubmit: async (values, actions) => {
      setRenameError(false);
      const { name } = values;
      const filteredName = leoProfanity.clean(name);
      const data = { name: filteredName, id: channelId };
      try {
        await api.renameChannel(data);
        handleClose();
        toast.success(t('modals.rename.channelRenamed'));
      } catch (error) {
        setRenameError(true);
        rollbar.error('RenameChannel', error);
        toast.error(t('error.networkError'));
      }
      actions.setSubmitting(false);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div className="modal-content">
      <ModalHeader closeButton>
        <ModalTitle className="modal-title h4">
          {t('modals.rename.title')}
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="modal-body">
        <Form onSubmit={f.handleSubmit}>
          <div className="form-floating">
            <Form.Control
              className={cn('form-control mb-2', { 'is-invalid': renameError || f.errors.name })}
              type="text"
              id="channel-name-field"
              name="name"
              aria-label={t('modals.add.channelName')}
              placeholder={t('modals.add.enterChannelName')}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              ref={inputRef}
            />
            <label htmlFor="channel-name-field">{t('modals.add.channelName')}</label>
            <div className="invalid-tooltip">{f.errors.name}</div>
          </div>
          <div className="d-flex justify-content-end">
            <ButtonClose handleClose={handleClose} text={t('modals.rename.cancel')} />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={f.isSubmitting}
            >
              {t('modals.rename.submit')}
            </button>
          </div>
        </Form>
      </ModalBody>
    </div>
  );
};

export default ModalRenameChannel;
