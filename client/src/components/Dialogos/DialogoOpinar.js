import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function DialogoOpinar(props) {

  const [value, setValue] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSave = (event) => {
    // TODO
  }

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Opinar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Calificacion</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={5}
                step={1}
                value={value}
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comentario</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}