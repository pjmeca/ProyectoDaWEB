import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { GetJWT } from "../../utils/JWT";
import { Accordion, InputGroup, Spinner } from "react-bootstrap";
import Buscador from "../Buscador";
import CalificacionFormNumber from "../CalificacionFormNumber";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Mapa from "../Mapa";
import { isInArea } from "../../utils/Filtros";
import Estrellas from "../Estrellas";

export default function TablaRestaurantes() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [backendData, setBackendData] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [restaurantesPorPagina] = useState(10);
  const [restaurantesFiltrados, setRestaurantesFiltrados] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [calificacion, setCalificacion] = useState(1);
  const [ubicacion, setUbicacion] = useState(null);
  const [radio, setRadio] = useState(1);

  useEffect(() => {
    console.log(terminoBusqueda);
    if (dataLoaded) {
      let filtrados = backendData.restaurantes;

      // Filtrar por término de búsqueda
      if (terminoBusqueda && !(terminoBusqueda.trim() === "")) {
        filtrados = filtrados.filter((restaurante) => {
          return (
            restaurante.resumen.nombre &&
            restaurante.resumen.nombre
              .toLowerCase()
              .includes(terminoBusqueda.toLowerCase())
          );
        });
      }

      // Filtrar por calificación
      filtrados = filtrados.filter((restaurante) => {
        return (
          restaurante.resumen.calificacionMedia &&
          restaurante.resumen.calificacionMedia >= calificacion
        );
      });

      // Filtrar por area
      if (ubicacion && ubicacion.latitude && ubicacion.longitude && radio > 0) {
        filtrados = filtrados.filter((restaurante) => {
          return isInArea(
            restaurante.resumen.latitud,
            restaurante.resumen.longitud,
            ubicacion.latitude,
            ubicacion.longitude,
            radio
          );
        });
      }
      setRestaurantesFiltrados(filtrados);
    }
  }, [
    dataLoaded,
    backendData,
    terminoBusqueda,
    calificacion,
    ubicacion,
    radio,
  ]);

  useEffect(() => {
    fetch("/restaurantes", {
      headers: {
        Authentication: `Bearer ${GetJWT()}`,
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setBackendData(data);
        console.log(data);
        setDataLoaded(true);
      });
  }, []);

  function handleMapaChange(ubicacion, radio) {
    setUbicacion(ubicacion);
    setRadio(radio);
  }

  function ContenidoTabla() {
    const indiceUltimoRestaurante = paginaActual * restaurantesPorPagina;
    const indicePrimerRestaurante =
      indiceUltimoRestaurante - restaurantesPorPagina;
    const restaurantesActuales = restaurantesFiltrados.slice(
      indicePrimerRestaurante,
      indiceUltimoRestaurante
    );

    return restaurantesActuales.map((restaurante, i) => (
      <tr key={i}>
        <th>{i + indicePrimerRestaurante + 1}</th>
        <th>{restaurante.resumen.nombre}</th>

        <th>
          <Estrellas calificacion={restaurante.resumen.calificacionMedia} />
        </th>

        <th>
          <Button
            variant={"primary"}
            href={"/restaurantes/" + restaurante.url.split("/").pop()}
          >
            Ir
          </Button>
        </th>
      </tr>
    ));
  }

  function Paginacion() {
    const numerosDePagina = [];

    for (
      let i = 1;
      i <= Math.ceil(restaurantesFiltrados.length / restaurantesPorPagina);
      i++
    ) {
      numerosDePagina.push(i);
    }

    return (
      <nav>
        <ul className="pagination">
          {numerosDePagina.map((numero) => (
            <li key={numero} className="page-item">
              <a
                onClick={() => setPaginaActual(numero)}
                href="#"
                className={`page-link ${
                  numero === paginaActual ? "active" : ""
                }`}
              >
                {numero}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <div>
      {!dataLoaded ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          {typeof backendData === "undefined" ||
          typeof backendData.restaurantes === "undefined" ||
          backendData.restaurantes.length === 0 ? (
            <p>No hay datos</p>
          ) : (
            <>
              <Form>
                <Row>
                  <Col sm={7} md={7} lg={8} xl={9}>
                    <Buscador handleBusqueda={setTerminoBusqueda} />
                  </Col>
                  <Col>
                    <InputGroup>
                      <InputGroup.Text>Más de </InputGroup.Text>
                      <CalificacionFormNumber
                        handleCalificacion={setCalificacion}
                      />
                      <InputGroup.Text> estrellas</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
                <div className="pt-2" />
                <Row>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Mapa</Accordion.Header>
                      <Accordion.Body>
                        <Mapa handleChange={handleMapaChange} />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Row>
                <div className="pt-2" />
              </Form>

              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Valoración media</th>
                    <th>Url</th>
                  </tr>
                </thead>
                <tbody>{ContenidoTabla()}</tbody>
              </Table>
              <Paginacion />
            </>
          )}
        </>
      )}
    </div>
  );
}
