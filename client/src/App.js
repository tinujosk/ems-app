import React, { useMemo, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeEdit from './components/EmployeeEdit';
import EmployeeView from './components/EmployeeView';
import Header from './components/Header';
import NotFound from './components/NotFound';
import { Row, Col } from 'react-bootstrap';
import About from './components/About';

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearchResults = useMemo(() => (results) => {
    console.log('Search results in App:', results);
    setSearchResults(results);
  }, []);
  
  const resetSearch = useMemo(() => () => {
    console.log('Resetting search');
    setSearchResults(null);
  }, []);
  return (
    <>
      <Row>
        <Col>
          <Header onSearchResults={handleSearchResults} />
        </Col>
      </Row>
      <Row>
        <Routes>
          <Route path='/' element={<Navigate replace to='/employees' />} />
          <Route path='/employees'>
            <Route 
              index 
              element={
                <EmployeeDirectory 
                  searchResults={searchResults} 
                  resetSearch={resetSearch} 
                />
              } 
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