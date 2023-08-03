import {
  selectAllChannels
} from '../../slices/channelsSlice';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useSocket } from '../../hooks/useSocket';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';

const ModalAddChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const channels = useSelector(selectAllChannels);
  const inputRef = useRef();
  const { addNewChannel } = useSocket();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const ChannelSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('modals.add.min'))
      .max(20, t('modals.add.max'))
      .notOneOf(channels.map(({ name }) => name), t('modals.add.alreadyExists'))
      .required(t('modals.add.requiredField'))
  });

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
            validationSchema={ChannelSchema}
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