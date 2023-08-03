import {
  selectAllChannels, selectChannelById
} from '../../slices/channelsSlice';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useSocket } from '../../hooks/useSocket';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';
import channelSchema from '../../validation/channelSchema';

const ModalRenameChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const channels = useSelector(selectAllChannels);
  const channelId = useSelector((state) => state.modals.data?.channelId);
  const channel = useSelector((state) => selectChannelById(state, channelId));
  const inputRef = useRef();
  const { renameChannel } = useSocket();

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
          validationSchema={channelSchema(channels)}
          onSubmit={async (values, actions) => {
            const { name } = values;
            const filteredName = leoProfanity.clean(name);
            try {
              await renameChannel(channelId, filteredName);
              handleClose();
              actions.setSubmitting(false);
              toast.success(t('modals.rename.channelRenamed'));
            } catch (error) {
              rollbar.error('RenameChannel', error);
              toast.error(t('error.networkError'));
              actions.setSubmitting(false);
            }
          }}
        >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleBlur,
              isSubmitting
            }) => (
            <Form onSubmit={handleSubmit}>
              <Field className="mb-2 form-control"
                     type="text"
                     id="username-field"
                     name="name"
                     aria-label={t('modals.add.channelName')}
                     placeholder={t('modals.add.enterChannelName')}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.name}
                     innerRef={inputRef}
              />
              {errors.name && touched.name && <ErrorMessage className="text-danger" name="name" component="div" />}

              <div className="d-flex justify-content-end">
                <Button
                  onClick={handleClose}
                  type="button"
                  className="me-2 btn btn-secondary"
                >
                  Отменить
                </Button>
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