import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import EmployeeSearch from './EmployeeSearch';

function Header({ handleSearch }) {
  return (
    <Navbar
      expand='lg'
      className='bg-body-tertiary p-3'
      bg='dark'
      data-bs-theme='dark'
    >
      <Container fluid>
        <Navbar.Brand>EMS Application</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={NavLink} to='/'>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to='/about'>
              About
            </Nav.Link>
          </Nav>
          <EmployeeSearch handleSearch={handleSearch} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
