import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = ({ keycloakInstance, authenticated, setAuthenticated }) => {
  const onLogout = () => {
    keycloakInstance.logout();
    setAuthenticated(false);
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        style={{
          background: '#4B090B',
        }}
        expand="lg"
      >
        <Container>
          <Navbar.Brand as={Link} to={'/'} style={{ color: 'white' }}>
            <HomeIcon />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={'/prediction'} style={{ color: 'white' }}>
                Pneumonia Detection
              </Nav.Link>
              <Nav.Link as={Link} to={'/data'} style={{ color: 'white' }}>
                Database
              </Nav.Link>
              <Nav.Link as={Link} to={'/about'} style={{ color: 'white' }}>
                About
              </Nav.Link>
            </Nav>
            <LogoutIcon
              onClick={onLogout}
              sx={{
                color: 'white',
                '&:hover': {
                  color: '#AA4656',
                },
              }}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
