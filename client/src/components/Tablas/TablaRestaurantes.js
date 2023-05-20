import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { GetJWT } from "../../utils/JWT";
import { InputGroup, Spinner } from "react-bootstrap";
import Buscador from "../Buscador";
import CalificacionFormNumber from "../CalificacionFormNumber";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

export default function TablaRestaurantes() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [backendData, setBackendData] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [restaurantesPorPagina] = useState(10);
  const [restaurantesFiltrados, setRestaurantesFiltrados] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("")
  const [calificacion, setCalificacion] = useState(1)

  useEffect(() => {
    console.log(terminoBusqueda)
    if (dataLoaded) {
      let filtrados = backendData.restaurantes

      // Filtrar por término de búsqueda
      if (terminoBusqueda && !(terminoBusqueda.trim() === "")) {
        filtrados = filtrados.filter((restaurante) => {
          return (
            restaurante.resumen.nombre &&
            restaurante.resumen.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
          );
        });        
      }

      // Filtrar por calificación
      filtrados = filtrados.filter((restaurante) => {
        return(
          restaurante.resumen.calificacionMedia &&
          restaurante.resumen.calificacionMedia>=calificacion
        );
      })

      setRestaurantesFiltrados(filtrados);
    }
  }, [dataLoaded, backendData, terminoBusqueda, calificacion]);

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
          <Button
            variant="primary"
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
                      <CalificacionFormNumber handleCalificacion={setCalificacion} />
                      <InputGroup.Text> estrellas</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
              </Form>

              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
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
