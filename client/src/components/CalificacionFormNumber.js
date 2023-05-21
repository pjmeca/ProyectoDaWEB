import React from "react";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

export default function CalificacionFormNumber(props) {
  const [calificacion, setCalificacion] = useState(1);

  useEffect(() => {
    const unidad = calificacion % 10;

    if (unidad > 5) {
      setCalificacion(5);
    } else if (unidad < 1) {
      setCalificacion(1);
    } else {
      setCalificacion(unidad);
    }

    props.handleCalificacion(calificacion);
  }, [calificacion]);

  return (
    <Form.Control
      type="number"
      min={1}
      max={5}
      step={1}
      value={calificacion}
      autoFocus
      onChange={(event) => setCalificacion(event.target.value)}
    />
  );
}
