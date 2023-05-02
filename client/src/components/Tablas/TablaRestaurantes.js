import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import { GetJWT } from '../../utils/JWT';

export default function TablaRestaurantes() {
  const [backendData, setBackendData] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [restaurantesPorPagina] = useState(10);

  useEffect(() => {
    fetch("/restaurantes", {
      headers: {
        "Authentication": `Bearer ${GetJWT()}`,
      }
    })
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data) => {
        setBackendData(data);
        console.log(data);
      });
  }, []);

  function ContenidoTabla() {
    const indiceUltimoRestaurante = paginaActual * restaurantesPorPagina;
    const indicePrimerRestaurante = indiceUltimoRestaurante - restaurantesPorPagina;
    const restaurantesActuales = backendData.restaurantes.slice(indicePrimerRestaurante, indiceUltimoRestaurante);

    return restaurantesActuales.map((restaurante, i) => (
      <tr key={i}>
        <th>{i + indicePrimerRestaurante + 1}</th>
        <th>{restaurante.resumen.nombre}</th>
        <th><Button variant="primary" href={"/restaurantes/"+restaurante.url.split('/').pop()}>Ir</Button></th>
      </tr>
    ));
  }

  function Paginacion() {
    const numerosDePagina = [];

    for (let i = 1; i <= Math.ceil(backendData.restaurantes.length / restaurantesPorPagina); i++) {
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
                className={`page-link ${numero === paginaActual ? "active" : ""}`}
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
      {typeof backendData === "undefined" ||
      typeof backendData.restaurantes === "undefined" ||
      backendData.restaurantes.length === 0 ? (
        <p>No hay datos</p>
      ) : (
        <>
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
    </div>
  );
}