import { Field, Form, Formik } from 'formik';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';
import useSocketApi from '../../hooks/useSocketApi';
import useAuth from '../../hooks/useAuth';
import messageSchema from '../../validation/messageSchema';

const MessageForm = ({ channel }) => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const { username } = useAuth();
  const inputRef = useRef(null);
  const api = useSocketApi();

  useEffect(() => {
    inputRef.current.focus();
  }, [channel]);

  return (
    <Formik
      initialValues={{
        message: '',
      }}
      validationSchema={messageSchema(t)}
      onSubmit={async ({ message }, actions) => {
        const filteredMessage = leoProfanity.clean(message);
        const messageToSend = {
          body: filteredMessage,
          channelId: channel.id,
          username,
        };

        try {
          await api.sendMessage(messageToSend);
          actions.resetForm();
        } catch (error) {
          rollbar.error('AddMessage', error);
          toast.error(t('error.networkError'));
          console.error(error);
        }
        actions.setSubmitting(false);
        inputRef.current.focus();
      }}
    >
      {({
        values, isSubmitting, dirty, isValid,
      }) => (
        <Form noValidate="" className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <Field
              className="border-0 p-0 ps-2 form-control"
              type="text"
              id="username-field"
              name="message"
              aria-label={t('chat.message')}
              placeholder={t('chat.enterMessage')}
              autoComplete="off"
              disabled={isSubmitting}
              value={values.message}
              innerRef={inputRef}
            />
            <button type="submit" disabled={!dirty || !isValid} className="btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="visually-hidden">{t('chat.submit')}</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
