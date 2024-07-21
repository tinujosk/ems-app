import React from 'react';
import notFound from '../images/notFound.jpg';
import '../App.css';

export default function NotFound() {
  return (
    <div className='notFoundContainer'>
      <img className='notFoundImage' src={notFound} alt='not found page 404' />
    </div>
  );
}
