import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navegacion() {
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky='top'>
        <Container>
          <Navbar.Brand href="/"><img className="logo" src="/assets/img/LOGO.png" /> </Navbar.Brand>
          <Nav className="navegacion">
            <Nav.Link href="/">Restaurantes</Nav.Link>
            <Nav.Link href="">Iniciar sesión</Nav.Link>
            <Nav.Link href="">Acerca de</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}