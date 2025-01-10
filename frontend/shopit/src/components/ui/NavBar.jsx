import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { AuthContext } from '../../context/AuthContext';
import React, { useContext } from 'react';


function NavBar({ numCartItems }) {
  const { isAuthenticated, setIsAuthenticated, username } = useContext(AuthContext);

  function logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('referesh');
    setIsAuthenticated(false);
  }

  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href='/'>shopit</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                shopit
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  {isAuthenticated ? (
                    <>
                      <Nav.Link href="profile/">{`Hi ${username}`}</Nav.Link>
                      <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link href="/login">Login</Nav.Link>
                      <Nav.Link href="#">Register</Nav.Link>
                    </>
                  )}
                  <Nav.Link href="/cart"><i className="bi bi-cart"></i>
                    <span>{numCartItems}</span>
                  </Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBar;