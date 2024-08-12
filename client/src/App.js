import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeEdit from './components/EmployeeEdit';
import EmployeeView from './components/EmployeeView';
import Header from './components/Header';
import NotFound from './components/NotFound';
import About from './components/About';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Row>
        <Col>
          <Header handleSearch={setSearchTerm} />
        </Col>
      </Row>
      <Row>
        <Routes>
          <Route path='/' element={<Navigate replace to='/employees' />} />
          <Route path='/employees'>
            <Route
              index
              element={<EmployeeDirectory searchTerm={searchTerm} />}
            />
            <Route path='view/:id' element={<EmployeeView />} />
            <Route path='edit/:id' element={<EmployeeEdit />} />
          </Route>
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Row>
    </>
  );
}

export default App;
