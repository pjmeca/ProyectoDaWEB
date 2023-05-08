import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Error404() {
  let to = "/";
  const history = useHistory();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      history.push("/");
    }, 5000);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [history, to]);

  return (
    <div className="App">
      <div className="cuerpo">
        <h1 className="titulo-error">404</h1>
        <p>Página no encontrada</p>
        <p className="espacio">Redireccionando en 5 segundos...</p>
        <p>
          O puedes hacer clic <a href={to}>aquí</a> para ir directamente.
        </p>
      </div>
    </div>
  );
}
