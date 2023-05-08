import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Estrellas({ calificacion, text, style }) {
  const numEstrellas = 5;
  let calificacionEntera = parseInt(calificacion);
  let decimal = calificacion - calificacionEntera;
  let num = 0;
  if (decimal > 0) num = 1;

  const estrellas = [];

  for (let i = 1; i <= Math.min(calificacionEntera, numEstrellas); i++) {
    estrellas.push(<FontAwesomeIcon icon="fa-solid fa-star" key={i} />);
  }

  if (decimal < 0.25 && num)
    //Vacia
    estrellas.push(
      <FontAwesomeIcon icon="fa-regular fa-star" key={calificacionEntera + 1} />
    );
  else if (decimal > 0.75 && num)
    //Entera
    estrellas.push(
      <FontAwesomeIcon icon="fa-solid fa-star" key={calificacionEntera + 1} />
    );
  else if (num)
    //Media
    estrellas.push(
      <FontAwesomeIcon
        icon="fa-solid fa-star-half-stroke"
        key={calificacionEntera + 1}
      />
    );

  for (let i = calificacionEntera + 1 + num; i <= 5; i++) {
    estrellas.push(<FontAwesomeIcon icon="fa-regular fa-star" key={i} />);
  }

  return (
    <span style={style}>
      {estrellas} {text ? " " + text : ""}
    </span>
  );
}
