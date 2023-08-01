import {
  selectAllChannels
} from '../../slices/channelsSlice';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useSocket } from '../../hooks/useSocket';

const ModalAddChannel = ({ handleClose }) => {
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
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов')
      .notOneOf(channels.map(({ name }) => name), 'Такой канал уже существует')
      .required('Обязательно')
  });

  return (

      <div className="modal-content">
        <ModalHeader closeButton>
          <ModalTitle className="modal-title h4">
            Добавить канал
          </ModalTitle>
        </ModalHeader>
        <ModalBody className="modal-body">
          <Formik
            initialValues={{
              name: '',
            }}
            validationSchema={ChannelSchema}
            onSubmit={async (values, actions) => {
              const channel = {
                name: values.name,
              };
              try {
                await addNewChannel(channel);
                handleClose();
                actions.setSubmitting(false);
              } catch (error) {
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
            <Field className="mb-2 form-control" type="text" id="username-field" name="name" aria-label="Сообщение" placeholder="Введите сообщение"
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
                Отправить
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