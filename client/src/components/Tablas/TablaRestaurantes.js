import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import { GetJWT } from '../../utils/JWT';

export default function TablaRestaurantes() {
  const [backendData, setBackendData] = useState([]);

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

    return backendData.restaurantes.map((restaurante, i) => (
      <tr key={i}>
        <th>{i}</th>
        <th>{restaurante.resumen.nombre}</th>
        <th><Button variant="primary" href={"/restaurantes/"+restaurante.url.split('/').pop()}>Ir</Button></th>
      </tr>
    ));
  }

  return (
    <div>
      {typeof backendData === "undefined" ||
      typeof backendData.restaurantes === "undefined" ||
      backendData.restaurantes.length === 0 ? (
        <p>No hay datos</p>
      ) : (
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
      )}
    </div>
  );
}
