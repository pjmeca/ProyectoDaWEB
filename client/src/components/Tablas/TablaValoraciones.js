import ListGroup from "react-bootstrap/ListGroup";
import Estrellas from "../Estrellas";

export default function TablaValoraciones({ valoraciones }) {
  console.log(valoraciones);

  function ContenidoTabla() {
    return valoraciones.reverse().map((valoracion, i) => (
      <ListGroup.Item key={i} style={{ textAlign: "left" }}>
        <Estrellas calificacion={valoracion.calificacion} />

        {" en " + valoracion.fecha.split("T")[0]}

        <br />

        {valoracion.comentario}
      </ListGroup.Item>
    ));
  }

  return (
    <div>
      {typeof valoraciones === "undefined" ? (
        <>404</>
      ) : (
        valoraciones.length == 0 ? 
          (<p>No hay valoraciones</p>) : 
          (<div className="scrolleable"><ListGroup variant="flush">{ContenidoTabla()}</ListGroup></div>)  
      )}
    </div>
  );
}
