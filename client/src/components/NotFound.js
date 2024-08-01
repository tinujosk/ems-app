import React from 'react';
import notFound from '../images/notFound.jpg';
// import '../App.css';
import { Container, Image } from 'react-bootstrap';

export default function NotFound() {
  return (
    <Container className='w-100 vh-100 d-flex justify-content-center notFoundContainer'>
      <Image className='h-50' src={notFound} alt='not found page 404' />
    </Container>
  );
}
