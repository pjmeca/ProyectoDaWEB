import React, { useState, useEffect } from "react";
import { ReactBingmaps } from "react-bingmaps";
import { Col, Form, Row } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";

function Mapa({handleChange}) {
  const [pinLocation, setPinLocation] = useState(null);
  const [radio, setRadio] = useState(1);

  useEffect(() => {
    if (radio <= 0) {
      setRadio(0.1)
    } 
  }, [radio]);

  useEffect(() => {
    handleChange(pinLocation, radio)
  }, [pinLocation, radio]);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Row>
        <InputGroup>
        <InputGroup.Text>Latitud:</InputGroup.Text>
          <Form.Control
            type="number"
            step={0.01}
            value={pinLocation ? pinLocation.latitude : ""}
            placeholder="Introduce la latitud"
            autoFocus
            onChange={(event) => setPinLocation((oldPinLocation) => ({
              ...oldPinLocation,
              latitude: event.target.value
            }))}
          />
          <InputGroup.Text>Longitud:</InputGroup.Text>
          <Form.Control
            type="number"
            step={0.01}
            value={pinLocation ? pinLocation.longitude : ""}
            placeholder="Introduce la longitud"
            autoFocus
            onChange={(event) => setPinLocation((oldPinLocation) => ({
              ...oldPinLocation,
              longitude: event.target.value
            }))}
          />
          <InputGroup.Text>Radio:</InputGroup.Text>
          <Form.Control
            type="number"
            min={1}
            step={1}
            value={radio}
            autoFocus
            onChange={(event) => setRadio(event.target.value)}
          />
          <Button variant="primary" onClick={() => setPinLocation(null)}>
            Resetear ubicación
          </Button>
        </InputGroup>
      </Row>

      {/* Hay un bug con el componente de Bing, así que debe ocultarse el selector de mapas */}
      <style>
        {`.NavBar_MapTypeButtonContainerWrapper {
          display: none;
        }`}
      </style>
      <ReactBingmaps
        bingmapKey="AjAeq5qsn6jQW8y9bmaueaRe09xdDww9v-bPXtm2q3OGe19sb7jxC48xmjyC8j15"
        center={[0, 0]}
        zoom={8}
        getLocation={{
          addHandler: "click",
          callback: setPinLocation,
        }}
        pushPins={
          pinLocation && pinLocation.latitude && pinLocation.longitude
            ? [
                {
                  location: [pinLocation.latitude, pinLocation.longitude],
                  option: { color: "red" },
                },
              ]
            : []
        }
      />
    </div>
  );
}

export default Mapa;
