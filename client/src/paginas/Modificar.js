import ImagenHeader from "../components/Plantilla/ImagenHeader";
import { useEffect, useState } from "react";
import TablaPlatos from "../components/Tablas/TablaPlatos";
import TablaSitiosTuristicos from "../components/Tablas/TablaSitiosTuristicos";
import Estrellas from "../components/Estrellas";
import Button from "react-bootstrap/Button";
import Dialogo from "../components/Dialogos/Dialogo";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import { GetJWT, IsAllowed } from "../utils/JWT";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Form from "react-bootstrap/Form";
import { Spinner } from "react-bootstrap";
import Error404 from "../components/Error404";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modificar({ id }) {
  const history = useHistory();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [backendData, setBackendData] = useState([]);
  const [sitiosTuristicos, setSitiosTuristicos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [modalShow, setModalShow] = useState(false);

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
        setNombre(data.nombre);
        setLatitud(data.latitud.toString());
        setLongitud(data.longitud.toString());
      });

    fetch(`/restaurantes/${id}/sitiosProximos`, {
      headers: {
        Authentication: `Bearer ${GetJWT()}`,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        return "";
      })
      .then((data) => {
        setSitiosTuristicos(data.lista);
        setDataLoaded(true);
      });
  }, []);

  const handleEditar = () => {
    if (
      nombre.trim() === "" ||
      latitud.trim() === "" ||
      longitud.trim() === ""
    ) {
      setMensajeError("Por favor, rellena todos los campos");
      setShowAlert(true);
      return;
    }

    backendData.nombre = nombre;
    backendData.latitud = latitud;
    backendData.longitud = longitud;

    const nombreActual = nombre;

    fetch(`/restaurantes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${GetJWT()}`,
      },
      body: JSON.stringify(backendData),
    })
      .then((response) => {
        if (!response.ok) {
          setShowAlert(true);
          setMensajeError(`El restaurante ${nombreActual} no existe.`);
        } else {
          history.push(`/restaurantes/${id}`);
        }
      })
      .catch((error) => {
        setShowAlert(true);
        setMensajeError(`Error al crear el restaurante ${nombreActual}.`);
        console.error("Error:", error);
      });
  };

  function handleSitiosTuristicosUpdate(value) {
    let sitiosTuristicosElegidos = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i]) sitiosTuristicosElegidos.push(sitiosTuristicos[i]);
    }
    console.log(sitiosTuristicosElegidos);

    backendData.sitiosTuristicos = sitiosTuristicosElegidos;

    fetch(`/restaurantes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${GetJWT()}`,
      },
      body: JSON.stringify(backendData),
    })
      .then((response) => {
        if (!response.ok) {
          setShowAlert(true);
          setMensajeError(`El restaurante no existe.`);
        } else {
          history.push(`/restaurantes/${id}`);
        }
      })
      .catch((error) => {
        setShowAlert(true);
        setMensajeError(`Error al crear el restaurante.`);
        console.error("Error:", error);
      });
  }

  const handleEliminar = () => {
    fetch(`/restaurantes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${GetJWT()}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setShowAlert(true);
          setMensajeError(
            `Ha surgido un error al eliminar el restaurante, por favor, inténtelo más tarde.`
          );
        }
        history.push(`/restaurantes`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
          {typeof backendData === "undefined" ||
          notFound ||
          !IsAllowed(backendData.idGestor) ? (
            <div className="cuerpo">
              <Error404 />
            </div>
          ) : (
            <>
              <ImagenHeader titulo={`Modificar ${backendData.nombre}`} />

              <div className="cuerpo">

                <div className="inline-l">
                  <Button variant="primary" onClick={() => {history.push(`/restaurantes/${id}`)}}>
                    <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Atrás
                  </Button>
                </div>                

                <h3>Detalles</h3>

                <Form className="formulario">
                  <Alert
                    show={showAlert}
                    variant="danger"
                    onClose={() => setShowAlert(false)}
                    dismissible
                  >
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{mensajeError}</p>
                  </Alert>

                  <Form.Group className="mb-3" controlId="nombre">
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      value={nombre}
                      onChange={(event) => setNombre(event.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 mr-3"
                    controlId="latitud"
                    style={{ gridColumn: "1" }}
                  >
                    <Form.Control
                      type="number"
                      placeholder="Latitud"
                      value={latitud}
                      onChange={(event) => setLatitud(event.target.value)}
                      required
                    />
                    <Form.Text className="text-muted">
                      Utiliza el punto (.) para los decimales.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="longitud"
                    style={{ gridColumn: "2" }}
                  >
                    <Form.Control
                      type="number"
                      placeholder="Longitud"
                      value={longitud}
                      onChange={(event) => setLongitud(event.target.value)}
                      required
                    />
                    <Form.Text className="text-muted">
                      Utiliza el punto (.) para los decimales.
                    </Form.Text>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleEditar}
                  >
                    Modificar
                  </Button>
                </Form>

                <div className="espacio" />
                <TablaSitiosTuristicos
                  sitiosTuristicos={sitiosTuristicos}
                  editable={true}
                  idRestaurante={id}
                  onSeleccionadosChange={handleSitiosTuristicosUpdate}
                />

                <div className="espacio" />
                <TablaPlatos
                  platos={backendData.platos}
                  idRestaurante={id}
                  editable={true}
                />

                <div style={{ gridColumn: 3, textAlign: "right" }}>
                  <Button variant="danger" onClick={() => setModalShow(true)}>
                    Eliminar
                  </Button>
                </div>

                <Dialogo
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  title="¿Deseas continuar?"
                  body={<p>El restaurante será eliminado del sistema.</p>}
                  buttons={
                    <Button variant="danger" onClick={handleEliminar}>
                      Eliminar
                    </Button>
                  }
                />
              </div>
            </>
          )}
          )
        </>
      )}
    </div>
  );
}
