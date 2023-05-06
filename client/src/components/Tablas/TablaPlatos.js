import { useState } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import DialogoPlatos from "../Dialogos/DialogoPlatos";
import Dialogo from "../Dialogos/Dialogo";
import { GetJWT } from "../../utils/JWT";

export default function TablaPlatos({ idRestaurante, platos, editable=false } ) {

  const [modalShow, setModalShow] = useState(false);
  const [modalEliminarShow, setModalEliminarShow] = useState(false);
  const [platoActual, setPlatoActual] = useState();

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
                    <Button className={"edicion"} variant="link" onClick={() => {setPlatoActual(plato); setModalShow(true)}}>
                      <FontAwesomeIcon icon="fa-regular fa-pen-to-square" /> 
                    </Button>  
                    <Button className={"edicion eliminar"} variant="link" onClick={() => {setPlatoActual(plato); setModalEliminarShow(true)}}>
                      <FontAwesomeIcon icon="fa-regular fa-trash-can" />   
                    </Button>           
                  </th>
                </> :
                null
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
                ) : null  
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


        </>
      )}
    </div>
  );
}
