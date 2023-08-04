import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../slices/modalsSlice';
import ModalAddChannel from '../ModalAddChannel';
import ModalRemoveChannel from '../ModalRemoveChannel';
import ModalRenameChannel from '../ModalRenameChannel';

const modalMapping = {
  addChannel: ModalAddChannel,
  removeChannel: ModalRemoveChannel,
  renameChannel: ModalRenameChannel,
};

const ModalWrapper = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modals.isOpened);
  const modalType = useSelector((state) => state.modals.type);
  const ModalComponent = modalMapping[modalType];

  const handleClose = () => {
    dispatch(actions.closeModal());
  };

  return (
    <Modal show={isOpened} onHide={handleClose} centered>
      {ModalComponent && <ModalComponent handleClose={handleClose} />}
    </Modal>
  );
};

export default ModalWrapper;
