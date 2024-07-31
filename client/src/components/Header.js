import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
} from 'react-bootstrap';

function Header() {
  return (
    <Navbar
      expand='lg'
      className='bg-body-tertiary p-3'
      bg='dark'
      data-bs-theme='dark'
    >
      <Container fluid>
        <Navbar.Brand href='#'>EMS Application</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link>
              <NavLink to='/'>Home</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to='/'>About</NavLink>
            </Nav.Link>
          </Nav>
          <Form className='d-flex'>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
            />
            <Button variant='outline-success'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
