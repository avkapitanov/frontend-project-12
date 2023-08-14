import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Form, ModalBody, ModalHeader, ModalTitle,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useRollbar } from '@rollbar/react';
import cn from 'classnames';
import useSocketApi from '../hooks/useSocketApi';
import {
  selectAllChannels,
  actions as channelsActions,
} from '../slices/channelsSlice';
import channelSchema from '../validation/channelSchema';
import ButtonClose from './ButtonClose';

const ModalAddChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const channels = useSelector(selectAllChannels);
  const inputRef = useRef();
  const api = useSocketApi();
  const dispatch = useDispatch();
  const [addError, setAddError] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const f = useFormik({
    initialValues: { name: '' },
    validationSchema: channelSchema(channels, t),
    onSubmit: async (values, actions) => {
      setAddError(false);
      const { name } = values;
      const filteredName = leoProfanity.clean(name);
      const channel = {
        name: filteredName,
      };
      try {
        const data = await api.addNewChannel(channel);
        dispatch(channelsActions.setCurrentChannelId(data.id));
        handleClose();
        toast.success(t('modals.add.channelAdded'));
      } catch (error) {
        setAddError(true);
        rollbar.error('AddChannel', error);
        toast.error(t('error.networkError'));
      }
      actions.setSubmitting(false);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div className="modal-content">
      <ModalHeader closeButton>
        <ModalTitle className="modal-title h4">
          {t('modals.add.title')}
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="modal-body">
        <Form onSubmit={f.handleSubmit}>
          <div className="form-floating">
            <Form.Control
              className={cn('form-control mb-2', { 'is-invalid': addError || f.errors.name })}
              type="text"
              id="channel-name-field"
              name="name"
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              aria-label={t('modals.add.channelName')}
              placeholder={t('modals.add.enterChannelName')}
              value={f.values.name}
              ref={inputRef}
            />
            <label htmlFor="channel-name-field">{t('modals.add.channelName')}</label>
            <div className="invalid-tooltip">{f.errors.name}</div>
          </div>

          <div className="d-flex justify-content-end">
            <ButtonClose handleClose={handleClose} text={t('modals.add.cancel')} />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={f.isSubmitting}
            >
              {t('modals.add.submit')}
            </button>
          </div>
        </Form>
      </ModalBody>
    </div>
  );
};

export default ModalAddChannel;
