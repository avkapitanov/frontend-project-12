import { Form, Formik } from 'formik';
import { Button, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useSocket } from '../../hooks/useSocket';
import { useSelector } from 'react-redux';

const ModalRemoveChannel = ({ handleClose }) => {
  const { removeChannel } = useSocket();
  const channelId = useSelector((state) => state.modals.data?.channelId);

  return (
    <div className="modal-content">
      <ModalHeader closeButton>
        <ModalTitle className="modal-title h4">
          Удалить канал
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="modal-body">
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={async (values, actions) => {
            try {
              await removeChannel(channelId);
              handleClose();
              actions.setSubmitting(false);
            } catch (error) {
              actions.setSubmitting(false);
            }
          }}
        >
          {({
              handleSubmit,
              isSubmitting
            }) => (
            <Form onSubmit={handleSubmit}>
              <p className="lead">Уверены?</p>
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
                  className="btn btn-danger"
                  disabled={isSubmitting}
                >
                  Удалить
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </div>
  );
};

export default ModalRemoveChannel;