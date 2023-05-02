import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { GetJWT, GetCorreo } from '../../utils/JWT';
import Alert from "react-bootstrap/Alert";
import { useHistory } from 'react-router'

export default function DialogoOpinar(props) {

  const history = useHistory()

  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [mensajeError, setMensajeError] = useState("")

  useEffect(() => {
    
    const unidad = calificacion % 10;

    let primerDigito = Math.floor(calificacion / 10);
    primerDigito = Math.max(Math.min(primerDigito, 5), 1); 

    setCalificacion(unidad);

    if (unidad > 5 || unidad < 1) {
      setCalificacion(primerDigito);
    }
  }, [calificacion]);

  const handleSave = (event) => {
    
    if(calificacion < 1 || calificacion > 5) {
      setMensajeError("Error al crear la valoración, la calificación debe estar entre 1 y 5.")
      setShowAlert(true);
      return;
    }

    const valoracion = {
      comentario: comentario,
      calificacion: calificacion,
      correo: GetCorreo()
    };
    
    fetch(`/opiniones/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authentication": `Bearer ${GetJWT()}`,
      },
      body: JSON.stringify(valoracion),
    })
      .then((response) => {
        if (!response.ok) {
          setMensajeError("Error al crear la valoración, por favor, vuelva a intentarlo.")
          setShowAlert(true);          
        }
        history.go(0)
      })
      .catch((error) => {
        setMensajeError("Error al crear la valoración, por favor, inténtelo más tarde.")
        setShowAlert(true);
        console.error("Error:", error);
      });
  }

  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Opinar</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Alert
            show={showAlert}
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <p>{mensajeError}</p>
          </Alert>

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Calificacion</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={5}
                step={1}
                value={calificacion}
                autoFocus
                onChange={(event) => setCalificacion(event.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comentario</Form.Label>
              <Form.Control as="textarea" rows={3} value={comentario} onChange={(event) => setComentario(event.target.value)}/>
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