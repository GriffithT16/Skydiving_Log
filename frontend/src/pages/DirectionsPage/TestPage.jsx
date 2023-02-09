import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <Button variant="btn btn-primary" onClick={handleShow} style={{background: "skyblue"}}>
        View Weather
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Weather Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.weather}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default(Example);