import { useFormik } from 'formik';
import {
  Form, ModalBody, ModalHeader, ModalTitle,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import useSocketApi from '../../hooks/useSocketApi';
import ButtonClose from '../ButtonClose';

const ModalRemoveChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const api = useSocketApi();
  const channelId = useSelector((state) => state.modals.data?.channelId);

  const f = useFormik({
    initialValues: {},
    onSubmit: async (values, actions) => {
      try {
        await api.removeChannel({ id: channelId });
        handleClose();
        actions.setSubmitting(false);
        toast.success(t('modals.remove.channelRemoved'));
      } catch (error) {
        rollbar.error('RemoveChannel', error);
        toast.error(t('error.networkError'));
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <div className="modal-content">
      <ModalHeader closeButton>
        <ModalTitle className="modal-title h4">
          {t('modals.remove.title')}
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="modal-body">
        <Form onSubmit={f.handleSubmit}>
          <p className="lead">{t('modals.remove.areSure')}</p>
          <div className="d-flex justify-content-end">
            <ButtonClose handleClose={handleClose} text={t('modals.remove.cancel')} />
            <button
              type="submit"
              className="btn btn-danger"
              disabled={f.isSubmitting}
            >
              {t('modals.remove.submit')}
            </button>
          </div>
        </Form>
      </ModalBody>
    </div>
  );
};

export default ModalRemoveChannel;
