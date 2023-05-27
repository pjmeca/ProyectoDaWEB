export default function ImagenHeader({ titulo, imagen="/assets/img/calle.jpg" }) {
  titulo = titulo ? titulo : "Restaurantes";

  return (
    <>
      <div
        className="cabecera"
        style={{ backgroundImage: "url(" + imagen + ")" }}
      >
        <p>{titulo}</p>
      </div>
    </>
  );
}
