import { useState } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import DialogoPlatos from "../Dialogos/DialogoPlatos";
import Dialogo from "../Dialogos/Dialogo";
import { GetJWT } from "../../utils/JWT";
import { Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";

export default function TablaPlatos({ idRestaurante, platos, editable=false } ) {

  const [modalShow, setModalShow] = useState(false);
  const [modalEliminarShow, setModalEliminarShow] = useState(false);
  const [modalIncidenciaShow, setModalIncidenciaShow] = useState(false);
  const [platoActual, setPlatoActual] = useState();
  const [comentarioIncidencia, setComentarioIncidencia] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [mensajeError, setMensajeError] = useState("")

  function ContenidoTabla() {
    return platos.map((plato) => (    
      (editable || plato.disponible) ?   
      <tr key={plato.nombre}>
        <th style={{width: "25%"}}>  {plato.nombre}</th>
        <th style={editable ? { width: "45%"} : { width: "65%"}}>  {plato.descripcion}</th>
        <th style={{width: "10%"}}>  {plato.precio} €</th>
        {editable ? 
                <>
                  <th style={{width: "20%"}}>{plato.disponible ? "Disponible" : "No disponible"}</th>
                  <th >
                    <Button className={"edicion"} variant="link" onClick={() => {setPlatoActual(plato); setComentarioIncidencia(""); setModalShow(true)}}>
                      <FontAwesomeIcon icon="fa-regular fa-pen-to-square" /> 
                    </Button>  
                    <Button className={"edicion eliminar"} variant="link" onClick={() => {setPlatoActual(plato); setComentarioIncidencia(""); setModalEliminarShow(true)}}>
                      <FontAwesomeIcon icon="fa-regular fa-trash-can" />   
                    </Button>           
                  </th>
                </> :
                <th >
                  <Button className={"edicion incidencia"} variant="link" onClick={() => {setPlatoActual(plato); setComentarioIncidencia(""); setModalIncidenciaShow(true)}}>
                    <FontAwesomeIcon icon="fa-triangle-exclamation" />
                  </Button>                             
                </th>
              }
      </tr> : null
    ));
  }

  function handleEliminar() {        

    let enviar = {
      valor: `nombre=${platoActual.nombre}`
    }

    fetch(`/restaurantes/${idRestaurante}/plato`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authentication": `Bearer ${GetJWT()}`,
      },
      body: JSON.stringify(enviar),
    })
      .then((response) => {
        if (response.ok)
          history.go(0)
      })
      .catch((error) => {
        setMensajeError(fetchError)
        setShowAlert(true);
        console.error("Error:", error);
      });    
  }

  function handleIncidencia() {        

    if (platoActual.nombre.trim() === "" || comentarioIncidencia.trim() === "") {
      setMensajeError("Por favor, revise los campos del formulario.")
      setShowAlert(true)
      return
    }

    if (comentarioIncidencia.length > 300) {
      setMensajeError("Comentario demasiado largo, máximo 300 caracteres.")
      setShowAlert(true)
      return
    }

    let incidencia = {
      idRestaurante: idRestaurante,
      nombre: platoActual.nombre,
      comentario: comentarioIncidencia,
    }

    console.log("Nueva incidencia")
    console.log(incidencia)

    fetch(`/incidencias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authentication": `Bearer ${GetJWT()}`,
      },
      body: JSON.stringify(incidencia),
    })
      .then((response) => {
        if (response.ok)
          history.go(0)
        else
          throw new Error("Error al crear la incidencia, por favor, inténtalo más tarde.")
      })
      .catch((error) => {
        setMensajeError(error.message)
        setShowAlert(true);
        console.error("Error:", error);
      });    
  }

  return (
    <div>
      {typeof platos === "undefined" || (!editable && platos.length == 0) ? (
        <></>
      ) : (
        <>
        <h3>Platos</h3>

        {editable ?
          <div className="inline-r">
          <Button variant="primary" onClick={() => {setPlatoActual(undefined); setModalShow(true)}}>
            <FontAwesomeIcon icon="fa-solid fa-plus" />
          </Button>
          </div> :
          <></>
        }
        <div className="scrolleable">
        <Table striped responsive="xl">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              {
                editable ?
                (
                  <>
                    <th>Disponibilidad</th>
                    <th>Opciones</th>              
                  </>
                ) : <th>Registrar Incidencia</th>
              }
            </tr>
          </thead>
          <tbody>{ContenidoTabla()}</tbody>
        </Table>
        </div>

        <DialogoPlatos
                show = {modalShow}
                onHide = {() => setModalShow(false)}
                idRestaurante = {idRestaurante}
                plato = {platoActual}
        />

        <Dialogo
                show = {modalEliminarShow}
                title = "Confirmar eliminación"
                body = "¿Deseas continuar?"
                buttons = {
                  <Button variant="danger" onClick={() => {handleEliminar()}}>
                    Eliminar
                  </Button>
                }
                onHide = {() => setModalEliminarShow(false)}
        />

        <Dialogo
                show = {modalIncidenciaShow}
                title = "Crear incidencia"
                body = {
                  <div>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Plato</Form.Label>
                      <Form.Control type="text" value={platoActual ? platoActual.nombre : ""} disabled/>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Comentario</Form.Label>
                      <Form.Control as="textarea" rows={3} value={comentarioIncidencia} onChange={(event) => setComentarioIncidencia(event.target.value)}/>
                    </Form.Group>

                    <Alert
                      show={showAlert}
                      variant="danger"
                      onClose={() => setShowAlert(false)}
                      dismissible
                    >
                      <p>{mensajeError}</p>
                    </Alert>
                  </div>
                }
                buttons = {
                  <Button variant="primary" onClick={() => {handleIncidencia()}}>
                    Crear
                  </Button>
                }
                onHide = {() => {setModalIncidenciaShow(false); setShowAlert(false);}}
        />
        
        </>
      )}
    </div>
  );
}
