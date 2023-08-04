import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { Field, Form, Formik } from 'formik';
import {
  Button, ModalBody, ModalHeader, ModalTitle,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';
import { useSocket } from '../../hooks/useSocket';
import {
  selectAllChannels,
} from '../../slices/channelsSlice';
import channelSchema from '../../validation/channelSchema';

const ModalAddChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const channels = useSelector(selectAllChannels);
  const inputRef = useRef();
  const { addNewChannel } = useSocket();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="modal-content">
      <ModalHeader closeButton>
        <ModalTitle className="modal-title h4">
          {t('modals.add.title')}
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="modal-body">
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={channelSchema(channels, t)}
          onSubmit={async (values, actions) => {
            const { name } = values;
            const filteredName = leoProfanity.clean(name);
            const channel = {
              name: filteredName,
            };
            try {
              await addNewChannel(channel);
              handleClose();
              actions.setSubmitting(false);
              toast.success(t('modals.add.channelAdded'));
            } catch (error) {
              rollbar.error('AddChannel', error);
              toast.error(t('error.networkError'));
              actions.setSubmitting(false);
            }
          }}
        >
          {({ values, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <div className="form-floating">
                <Field
                  className="mb-2 form-control"
                  type="text"
                  id="channel-name-field"
                  name="name"
                  aria-label={t('modals.add.channelName')}
                  placeholder={t('modals.add.enterChannelName')}
                  value={values.name}
                  innerRef={inputRef}
                />
                <label htmlFor="channel-name-field">{t('modals.add.channelName')}</label>
              </div>

              <div className="d-flex justify-content-end">
                <Button
                  onClick={handleClose}
                  type="button"
                  className="me-2 btn btn-secondary"
                >
                  {t('modals.add.cancel')}
                </Button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {t('modals.add.submit')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </div>
  );
};

export default ModalAddChannel;
