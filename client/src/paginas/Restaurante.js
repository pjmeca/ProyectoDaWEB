import ImagenHeader from "../components/Plantilla/ImagenHeader";
import { useEffect, useState } from "react";
import TablaPlatos from "../components/Tablas/TablaPlatos";
import TablaSitiosTuristicos from "../components/Tablas/TablaSitiosTuristicos";
import TablaIncidencias from "../components/Tablas/TablaIncidencias";
import Estrellas from "../components/Estrellas";
import Button from "react-bootstrap/Button";
import Dialogo from "../components/Dialogos/Dialogo";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import { GetJWT, IsAllowed } from "../utils/JWT";
import { Spinner } from "react-bootstrap";
import Error404 from "../components/Error404";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Restaurante({ id }) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [backendData, setBackendData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const history = useHistory();

  useEffect(() => {
    fetch(`/restaurantes/${id}`, {
      headers: {
        Authentication: `Bearer ${GetJWT()}`,
      },
    })
      .then((response) => {
        if (response.status != 200) {
          setNotFound(true);
          return "";
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        setBackendData(data);
        setDataLoaded(true);
      });
  }, []);

  return (
    <div className="App">
      {!dataLoaded ? (
        <div className="screen-centered">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {typeof backendData === "undefined" || notFound ? (
            <div className="cuerpo">
              <Error404 />
            </div>
          ) : (
            <>
              <ImagenHeader titulo={backendData.nombre} />

              <div className="cuerpo">

                <div className="inline-l">
                  <Button variant="primary" onClick={() => {history.push(`/restaurantes`)}}>
                    <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Atrás
                  </Button>
                </div>   

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
                    <div
                      className="seleccionable"
                      onClick={() => {
                        history.push(`/opiniones/${backendData.opinion}`);
                      }}
                    >
                      <div>
                        <Estrellas
                          calificacion={backendData.calificacionMedia}
                        />
                        {" " + backendData.numValoraciones}
                      </div>
                    </div>
                    {IsAllowed(backendData.idGestor) ? (
                      <div>
                        <Button
                          variant={"primary"}
                          onClick={() => {
                            history.push(`/restaurantes/${id}/modificar`);
                          }}
                        >
                          Modificar
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="espacio" />
                <TablaSitiosTuristicos
                  sitiosTuristicos={backendData.sitiosTuristicos}
                />
                <div className="espacio" />
                <TablaPlatos platos={backendData.platos} idRestaurante={id} />
                <div className="espacio" />
                <TablaIncidencias idRestaurante={id} />
                <div className="espacio" />

                <div style={{ display: "grid" }}>
                  <div style={{ gridColumn: 1, textAlign: "left" }}>
                    <Button
                      variant="primary"
                      onClick={() => {
                        history.push(`/opiniones/${backendData.opinion}`);
                      }}
                    >
                      Ver Opiniones
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
