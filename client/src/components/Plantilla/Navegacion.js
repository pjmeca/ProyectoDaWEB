import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IsLogin, logout } from "../../utils/JWT";

export default function Navegacion() {
  const handleCerrarSesion = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <img className="logo" src="/assets/img/LOGO.png" />{" "}
          </Navbar.Brand>
          <Nav className="navegacion">
            <Nav.Link href="/restaurantes">Restaurantes</Nav.Link>

            {!IsLogin() ? (
              <Nav.Link href="/login">Iniciar sesión</Nav.Link>
            ) : (
              <Nav.Link onClick={handleCerrarSesion}>Cerrar sesión</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
