import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const NavBar = () => {
  return (
    <>
      <Navbar collapseOnSelect style={{ background: '#740d10' }} expand="lg">
        <Container>
          <Navbar.Brand as={Link} to={'/'}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <HomeIcon sx={{ color: 'white' }} />
              <Typography sx={{ color: 'white' }}>PneumonIA</Typography>
            </Stack>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
