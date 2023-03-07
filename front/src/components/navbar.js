import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
      <Navbar collapseOnSelect bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to={'/'}>PneumonIA</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={'/prediction'}>Pneumonia Detection</Nav.Link>
              <Nav.Link as={Link} to={'/data'}>Database</Nav.Link>
              <Nav.Link as={Link} to={'/about'}>About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;