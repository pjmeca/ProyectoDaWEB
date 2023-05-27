import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import { GetJWT, GetCorreo } from "../../utils/JWT";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TablaIncidencias({ idRestaurante }) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [incidencias, setIncidencias] = useState([]);

  useEffect(() => {
    console.log(idRestaurante);

    fetch(`/incidencias?idRestaurante=${idRestaurante}`, {
      headers: {
        Authentication: `Bearer ${GetJWT()}`,
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setIncidencias(data);
        console.log(data);
        setDataLoaded(true);
      });
  }, []);

  function handleEliminar(incidencia) {
    console.log("ELIMINAR:");
    console.log(incidencia);

    fetch(`/incidencias`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${GetJWT()}`,
      },
      body: JSON.stringify(incidencia),
    })
      .then((response) => {
        if (response.ok) history.go(0);
      })
      .catch((error) => {
        setMensajeError(fetchError);
        setShowAlert(true);
        console.error("Error:", error);
      });
  }

  function ContenidoTabla() {
    return incidencias.map((incidencia, i) => (
      <ListGroup.Item key={i} style={{ textAlign: "left" }}>
        <div className="row">
          <div className="col-11">
            <strong>{incidencia.sub}</strong> escribió sobre <strong>{incidencia.nombre}</strong> en{" "}
            {incidencia.fechaHora.split("T")[0]}:
            <br />
            {incidencia.comentario}
          </div>
          {incidencia.correo === GetCorreo() ? (
            <Button
              className={"eliminar col-1"}
              variant="link"
              onClick={() => {
                handleEliminar(incidencia);
              }}
            >
              <FontAwesomeIcon icon="fa-regular fa-trash-can" />
            </Button>
          ) : null}
        </div>
      </ListGroup.Item>
    ));
  }

  return (
    <div>
      <h3>Incidencias</h3>
      {incidencias.length == 0 ? (
        <p>No hay incidencias</p>
      ) : (
        <>
          <div className="scrolleable">
            <ListGroup variant="flush">{ContenidoTabla()}</ListGroup>
          </div>
        </>
      )}
    </div>
  );
}
