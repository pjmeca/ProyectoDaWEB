import ImagenHeader from "../components/Plantilla/ImagenHeader";
import { useEffect, useState } from "react";
import TablaPlatos from "../components/Tablas/TablaPlatos";
import TablaSitiosTuristicos from "../components/Tablas/TablaSitiosTuristicos";
import Estrellas from "../components/Estrellas";
import Button from 'react-bootstrap/Button';
import Dialogo from "../components/Dialogo";
import Alert from "react-bootstrap/Alert";
import { useHistory } from 'react-router-dom';

export default function Restaurante({ id }) {
  const [notFound, setNotFound] = useState(false);
  const [backendData, setBackendData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const history = useHistory();

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

  const handleEliminar = () => { 

    fetch(`/restaurantes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (!response.ok) {
          setShowAlert(true);
          setMensajeError(`Ha surgido un error al eliminar el restaurante, por favor, inténtelo más tarde.`);
        }
        history.push(`/restaurantes`)
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

          <Alert
            show={showAlert}
            variant="danger"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>Error</Alert.Heading>
            <p>{mensajeError}</p>
          </Alert>

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
