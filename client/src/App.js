import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeEdit from './components/EmployeeEdit';
import EmployeeView from './components/EmployeeView';
import Header from './components/Header';
import NotFound from './components/NotFound';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Routes>
          <Route path='/' element={<Navigate replace to='/employees' />} />
          <Route path='/employees'>
            <Route index element={<EmployeeDirectory />} />
            <Route path='view/:id' element={<EmployeeView />} />
            <Route path='edit/:id' element={<EmployeeEdit />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Row>
    </>
  );
}

export default App;
