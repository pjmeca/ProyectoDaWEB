export default function ImagenHeader({ titulo, imagen }) {
  titulo = titulo ? titulo : "Restaurantes";

  return (
    <>
      {imagen ? (
        <div className="cabecera" style={{ backgroundImage: "url(" + { imagen } + ")" }}>
            <p>{titulo}</p>
        </div>
      ) : (
        <div className="cabecera" style={{ backgroundImage: "url(/assets/img/calle.jpg)" }}>
            <p>{titulo}</p>
        </div>
      )}
    </>
  );
}
