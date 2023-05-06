import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import { GetJWT } from "../../utils/JWT";

export default function TablaIncidencias({idRestaurante}) {

  const [dataLoaded, setDataLoaded] = useState(false)
  const [incidencias, setIncidencias] = useState([])

  useEffect(() => {

    console.log(idRestaurante)

    fetch(`/incidencias?idRestaurante=${idRestaurante}`, {
      headers: {
        "Authentication": `Bearer ${GetJWT()}`,
      },
    })
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data) => {
        setIncidencias(data);
        console.log(data);
        setDataLoaded(true);
      });    
  }, []);
  
  function ContenidoTabla() {
    return incidencias.map((incidencia, i) => (
      <ListGroup.Item key={i} style={{ textAlign: "left" }}>
        Sobre <strong>{incidencia.nombre}</strong> en {incidencia.fechaHora.split("T")[0]}
        <br />

        {incidencia.comentario}
      </ListGroup.Item>
    ));
  }

  return (
    <div>
      {
        incidencias.length == 0 ? 
          (<p>No hay incidencias</p>) : 
          
          (
            <>
              <h3>Incidencias</h3>
              <div className="scrolleable"><ListGroup variant="flush">{ContenidoTabla()}</ListGroup></div>
            </>
          )  
      }
    </div>
  );
}
