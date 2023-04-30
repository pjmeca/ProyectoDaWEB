import Table from "react-bootstrap/Table";

export default function TablaSitiosTuristicos({sitiosTuristicos}) { // TODO verificar funcionamiento

  function ContenidoTabla() {
    return sitiosTuristicos.map((sitiosTuristico, i) => (
      <tr key={i}>
        <th style={{width: "50%"}}>{sitiosTuristico.nombre}</th>
        <th style={{width: "50%"}}>{sitiosTuristico.wikipediaUrl}</th>
      
      </tr>
    ));
  }

  return (
    <div>
      {typeof sitiosTuristicos === "undefined" || sitiosTuristicos.length == 0 ? (
        <></>
      ) : (
        <>
        <h3>Platos</h3>
        <Table striped responsive="xl">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Más información</th>
            </tr>
          </thead>
          <tbody>{ContenidoTabla()}</tbody>
        </Table>
        </>
      )}
    </div>
  );
}
