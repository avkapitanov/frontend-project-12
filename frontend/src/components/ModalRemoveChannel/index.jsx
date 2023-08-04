import { Form, Formik } from 'formik';
import {
  Button, ModalBody, ModalHeader, ModalTitle,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import useSocket from '../../hooks/useSocket';

const ModalRemoveChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const { removeChannel } = useSocket();
  const channelId = useSelector((state) => state.modals.data?.channelId);

  return (
    <div className="modal-content">
      <ModalHeader closeButton>
        <ModalTitle className="modal-title h4">
          {t('modals.remove.title')}
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="modal-body">
        <Formik
          initialValues={{}}
          onSubmit={async (values, actions) => {
            try {
              await removeChannel(channelId);
              handleClose();
              actions.setSubmitting(false);
              toast.success(t('modals.remove.channelRemoved'));
            } catch (error) {
              rollbar.error('RemoveChannel', error);
              toast.error(t('error.networkError'));
              actions.setSubmitting(false);
            }
          }}
        >
          {({
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <p className="lead">Уверены?</p>
              <div className="d-flex justify-content-end">
                <Button
                  onClick={handleClose}
                  type="button"
                  className="me-2 btn btn-secondary"
                >
                  {t('modals.remove.cancel')}
                </Button>
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={isSubmitting}
                >
                  {t('modals.remove.submit')}
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
