import Table from "react-bootstrap/Table";
import { Form } from 'react-bootstrap';
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

export default function TablaSitiosTuristicos({sitiosTuristicos, editable=false, onSeleccionadosChange}) {

  // Ignora el warning de uncontrolled input (no afecta a la funcionalidad)
  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].startsWith("Warning: A component is changing an uncontrolled input")
      ) {
        return;
      }
      originalConsoleError.call(console, ...args);
    };
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  const [seleccionados, setSeleccionados] = useState([])

  useEffect(() => {
    let tam = typeof sitiosTuristicos === 'undefined' ? 0 : sitiosTuristicos.length
    setSeleccionados(new Array(tam).fill(true));  
  }, [sitiosTuristicos])

  function ContenidoTabla() {   

    return sitiosTuristicos.map((sitiosTuristico, i) => (
      <tr key={i}>
        <th style={{width: "50%"}}>{sitiosTuristico.nombre}</th>
        <th style={{width: "50%"}}>{sitiosTuristico.descripcion}</th>
        {editable ? 
               	<th>
                  <Form.Check
                    type="checkbox"
                    checked={seleccionados[i]}
                    onChange={(event) => {
                      const aux = [...seleccionados];
                      aux[i] = event.target.checked;
                      setSeleccionados(aux)
                    }}
                  />
                </th> :
                <></>
              }
      </tr>
    ));
  }

  function handleActualizar() {
    onSeleccionadosChange(seleccionados)
  }

  return (
    <div>
      {typeof sitiosTuristicos === "undefined" || sitiosTuristicos.length == 0 ? (
        <></>
      ) : (
        <>
        <h3>Sitios Turísticos</h3>
        <Table striped responsive="xl">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              {editable ? 
               	<th>Seleccionados</th> :
                <></>
              }
            </tr>
          </thead>
          <tbody>{ContenidoTabla()}</tbody>
        </Table>
        {editable ?
          <Button variant="primary" type="submit" onClick={handleActualizar}>
            Actualizar
          </Button> :
          <></>
        }
        </>
      )}
    </div>
  );
}
