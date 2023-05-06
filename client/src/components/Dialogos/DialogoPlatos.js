import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { GetJWT } from '../../utils/JWT';
import Alert from "react-bootstrap/Alert";
import { useHistory } from 'react-router'

export default function DialogoPlatos( { show, idRestaurante, onHide , plato }) {

  const history = useHistory()

  const [titulo, setTitulo] = useState("")
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [mensajeError, setMensajeError] = useState("")
  const [disponible, setDisponible] = useState(true)

  useEffect(() => {
    if (plato) {
      setNombre(plato.nombre);
      setDescripcion(plato.descripcion);
      setPrecio(plato.precio)
      setDisponible(plato.disponible)
      setTitulo("Editar plato")
    } else {
      setNombre("")
      setDescripcion("")
      setPrecio(1)
      setDisponible(true)
      setTitulo("Crear nuevo plato")
    }
  }, [plato, titulo]);

  useEffect(() => {
    if (precio < 0) {
      setPrecio(0);
    }
  }, [precio]);

  const handleSave = (event) => {

    const method = plato ? 'PUT' : 'POST';
    const fetchError = plato ? "Error al actualizar el plato, por favor, vuelva a intentarlo más tarde." : "Error al crear el plato, por favor, vuelva a intentarlo más tarde.";

    if(nombre.trim() === "" || descripcion.trim() === "" || precio < 0) {
      setMensajeError("Por favor, rellene los campos correctamente.")
      setShowAlert(true);
      return;
    }

    plato = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      disponible: disponible
    }   

    fetch(`/restaurantes/${idRestaurante}/plato`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authentication": `Bearer ${GetJWT()}`,
      },
      body: JSON.stringify(plato),
    })
      .then((response) => {
        if (!response.ok) {
          setMensajeError(fetchError)
          setShowAlert(true);          
        }
        else
          history.go(0)
      })
      .catch((error) => {
        setMensajeError(fetchError)
        setShowAlert(true);
        console.error("Error:", error);
      });
  }

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
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

          <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} disabled={plato ? true : false}/>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} value={descripcion} onChange={(event) => setDescripcion(event.target.value)}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                
                step={1}
                value={precio}
                
                onChange={(event) => setPrecio(event.target.value)}
              />
            </Form.Group>

            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label={disponible ? "Disponibile" : "No disponible"}
              checked={disponible}
              onChange={() => setDisponible(!disponible)}
            />
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
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