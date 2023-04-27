import { useEffect, useState } from "react";
import TablaRestaurantes from "../components/TablaRestaurantes";
import ImagenHeader from "../components/Plantilla/ImagenHeader";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

export default function Crear() {
    const history = useHistory();

  const [nombre, setNombre] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");

  const handleCrear = () => {
    const restaurante = {
      nombre: nombre,
      latitud: latitud,
      longitud: longitud,
    };

    fetch("/restaurantes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurante),
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Error al crear el restaurante')
        }
        return response.json()
      })
      .then(data => {
        history.push(`/restaurantes/${data.id}`)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <ImagenHeader titulo="Crear un restaurante" />

      <div className="cuerpo">
        <div className="formulario">
          <Form.Group className="mb-3" controlId="nombre">
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
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
            />
            <Form.Text className="text-muted">
              Utiliza el punto (.) para los decimales.
            </Form.Text>
          </Form.Group>
        </div>
        <Button variant="primary" type="submit" onClick={handleCrear}>
          Crear
        </Button>
      </div>
    </div>
  );
}
