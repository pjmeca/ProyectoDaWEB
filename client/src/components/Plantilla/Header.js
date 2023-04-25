import Navegacion from "./Navegacion";

export default function Header({ titulo, imagen }) {
  titulo = titulo ? titulo : "Restaurantes";

  return (
    <>
      <Navegacion />
      
      <header>
      {imagen ? (
        <div className="cabecera" style={{ backgroundImage: "url(" + { imagen } + ")" }}>
          
            <p>{titulo}</p>
          
          
        </div>
      ) : (
        <div className="cabecera" style={{ backgroundImage: "url(/assets/img/calle.jpg)" }}>
          
            <p>{titulo}</p>
          
          
        </div>
      )}
      </header>
     
      
    </>
  );
}
