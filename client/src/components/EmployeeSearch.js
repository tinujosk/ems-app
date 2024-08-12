import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function EmployeeSearch({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchEnabled, setSearchEnabled] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (searchTerm.trim()) {
      handleSearch(searchTerm.trim());
      setSearchEnabled(true);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchEnabled(false);
    handleSearch('');
  };

  return (
    <>
      <Form className='d-flex' onSubmit={handleSubmit}>
        <Form.Control
          type='search'
          placeholder='Search'
          className='me-2'
          aria-label='Search'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        {!searchEnabled && (
          <Button variant='outline-success' type='submit'>
            Search
          </Button>
        )}
      </Form>
      {searchEnabled && (
        <Button variant='outline-danger' onClick={clearSearch}>
          Clear
        </Button>
      )}
    </>
  );
}

export default EmployeeSearch;
