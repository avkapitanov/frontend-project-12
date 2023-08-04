import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import {
  ModalBody, ModalHeader, ModalTitle,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';
import cn from 'classnames';
import channelSchema from '../../validation/channelSchema';
import useSocket from '../../hooks/useSocket';
import {
  selectAllChannels, selectChannelById,
} from '../../slices/channelsSlice';
import ButtonClose from '../ButtonClose';

const ModalRenameChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const channels = useSelector(selectAllChannels);
  const channelId = useSelector((state) => state.modals.data?.channelId);
  const channel = useSelector((state) => selectChannelById(state, channelId));
  const inputRef = useRef();
  const { renameChannel } = useSocket();
  const [renameError, setRenameError] = useState(false);

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (

    <div className="modal-content">
      <ModalHeader closeButton>
        <ModalTitle className="modal-title h4">
          {t('modals.rename.title')}
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="modal-body">
        <Formik
          initialValues={{
            name: channel.name,
          }}
          validationSchema={channelSchema(channels, t)}
          onSubmit={async (values, actions) => {
            setRenameError(false);
            const { name } = values;
            const filteredName = leoProfanity.clean(name);
            try {
              await renameChannel(channelId, filteredName);
              handleClose();
              toast.success(t('modals.rename.channelRenamed'));
            } catch (error) {
              setRenameError(true);
              rollbar.error('RenameChannel', error);
              toast.error(t('error.networkError'));
            }
            actions.setSubmitting(false);
          }}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({
            values, errors, handleSubmit, isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="form-floating">
                <Field
                  className={cn('form-control mb-2', { 'is-invalid': renameError || errors.name })}
                  type="text"
                  id="channel-name-field"
                  name="name"
                  aria-label={t('modals.add.channelName')}
                  placeholder={t('modals.add.enterChannelName')}
                  value={values.name}
                  innerRef={inputRef}
                />
                <label htmlFor="channel-name-field">{t('modals.add.channelName')}</label>
                <div className="invalid-tooltip">{errors.name}</div>
              </div>
              <div className="d-flex justify-content-end">
                <ButtonClose handleClose={handleClose} text={t('modals.rename.cancel')} />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {t('modals.rename.submit')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </div>
  );
};

export default ModalRenameChannel;
