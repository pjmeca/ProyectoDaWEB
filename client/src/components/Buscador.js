import React, { useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Buscador(props) {
  const [busqueda, setBusqueda] = useState("");

  const handleChange = (event) => {
    const valor = event.target.value;
    setBusqueda(valor);
    props.handleBusqueda(valor);
  };

  return (
    <Form.Group>
      <InputGroup>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
        <FormControl
          type="text"
          placeholder="Buscar..."
          className="mr-sm-2"
          value={busqueda}
          onChange={handleChange}
        />
      </InputGroup>
    </Form.Group>
  );
}
