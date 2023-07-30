import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import { useRef } from 'react';
import { useSocket } from '../../hooks/useSocket';

const MessageForm = ({ channel }) => {
  const { username } = useAuth();
  const inputRef = useRef(null);
  const { sendMessage } = useSocket();

  const MessageSchema = Yup.object().shape({
    message: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={{
        message: '',
      }}
      validationSchema={MessageSchema}
      onSubmit={async ({ message }, actions) => {
        const messageToSend = {
          body: message,
          channelId: channel.id,
          username,
        };

        try {
          sendMessage(messageToSend);
          actions.resetForm();
        } catch (err) {
          console.error(err);
        }
        actions.setSubmitting(false);
        inputRef.current.focus();
      }}
    >
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting
        }) => (
        <Form noValidate="" className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <Field className="border-0 p-0 ps-2 form-control" type="text" id="username-field" name="message" aria-label="Сообщение" placeholder="Введите сообщение"
                   onChange={handleChange}
                   onBlur={handleBlur}
                   value={values.message}
                   innerRef={inputRef}
            />
            {errors.message && touched.message && <ErrorMessage className="text-danger" name="username" component="div" />}
            <button type="submit" disabled={isSubmitting} className="btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
              <span className="visually-hidden">Отправить</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;