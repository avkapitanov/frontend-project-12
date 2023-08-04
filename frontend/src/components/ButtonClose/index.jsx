import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonClose = ({ text, handleClose }) => (
  <Button
    onClick={handleClose}
    type="button"
    className="me-2 btn btn-secondary"
  >
    {text}
  </Button>
);

export default ButtonClose;
