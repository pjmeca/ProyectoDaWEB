import React from 'react'
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

export default function CalificacionFormNumber(props) {

    const [calificacion, setCalificacion] = useState(1);

    useEffect(() => {
        const unidad = calificacion % 10;
    
        let primerDigito = Math.floor(calificacion / 10);
        primerDigito = Math.max(Math.min(primerDigito, 5), 1);

        setCalificacion(unidad);

        if (unidad > 5 || unidad < 1) {
            setCalificacion(primerDigito);
        }

        props.handleCalificacion(calificacion)
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
  )
}
