import Table from "react-bootstrap/Table";

export default function TablaPlatos({platos}) {

  function ContenidoTabla() {
    return platos.map((plato, i) => (
      <tr key={i}>
        <th style={{width: "25%"}}>  {plato.nombre}</th>
        <th style={{width: "65%"}}>  {plato.descripcion}</th>
        <th style={{width: "10%"}}>  {plato.precio} €</th>
      </tr>
    ));
  }

  return (
    <div>
      {typeof platos === "undefined" || platos.length == 0 ? (
        <></>
      ) : (
        <>
        <h3>Platos</h3>
        <Table striped responsive="xl">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>{ContenidoTabla()}</tbody>
        </Table>
        </>
      )}
    </div>
  );
}
