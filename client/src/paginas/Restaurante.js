import ImagenHeader from "../components/Plantilla/ImagenHeader";
import { useEffect, useState } from "react";
import TablaPlatos from "../components/Tablas/TablaPlatos";
import TablaSitiosTuristicos from "../components/Tablas/TablaSitiosTuristicos";
import Estrellas from "../components/Estrellas";
import Button from 'react-bootstrap/Button';
import Dialogo from "../components/Dialogo";

export default function Restaurante({ id }) {
  const [notFound, setNotFound] = useState(false);
  const [backendData, setBackendData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetch(`/restaurantes/${id}`)
      .then((response) => {

        if(response.status != 200) {
          setNotFound(true)
          return ""
        }
          
        return response.json()
      })
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const handleEliminar = () => { // TODO cambiar a eliminar (ahora mismo es una copia de crear)
    if (
      nombre.trim() === "" ||
      latitud.trim() === "" ||
      longitud.trim() === ""
    ) {
      setMensajeError("Por favor, rellena todos los campos");
      setShowAlert(true);
      return;
    }

    const restaurante = {
      nombre: nombre,
      latitud: latitud,
      longitud: longitud,
    };

    const nombreActual = nombre;

    fetch("/restaurantes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurante),
    })
      .then((response) => {
        if (!response.ok) {
          setShowAlert(true);
          setMensajeError(`El restaurante ${nombreActual} ya existe.`);
        }
        return response.json();
      })
      .then((data) => {
        history.push(`/restaurantes/${data.id}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      {typeof backendData === "undefined" || notFound ? (
        <div className="cuerpo">
          <p>404</p>
        </div>
      ) : (
        <>
          <ImagenHeader titulo={backendData.nombre} />

          <div className="cuerpo">
            <h3>Detalles</h3>
            <div style={{ display: "grid", padding: "0 20%" }}>
              <div style={{ gridColumn: 1, textAlign: "left" }}>
                <p>Latitud: {backendData.latitud}</p>
                <p>Longitud: {backendData.longitud}</p>
              </div>

              <div style={{ gridColumn: 2, textAlign: "right" }}>
                <Estrellas calificacion={backendData.calificacionMedia} />
                {" " + backendData.numValoraciones}
              </div>
            </div>

            <TablaSitiosTuristicos
              sitiosTuristicos={backendData.sitiosTuristicos}
            />
            <TablaPlatos platos={backendData.platos} />

            <div style={{textAlign: "right"}}>
                <Button variant="danger" onClick={() => setModalShow(true)}>Eliminar</Button>
            </div>

            <Dialogo 
                show={modalShow}
                onHide={() => setModalShow(false)} 
                title = "¿Deseas continuar?"
                body = {<p>El restaurante será eliminado del sistema.</p>}
                buttons = {<Button variant="danger" onClick={handleEliminar}>Eliminar</Button>}
            />
          </div>
        </>
      )}
    </div>
  );
}
