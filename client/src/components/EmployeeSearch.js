import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { graphQLCommand } from '../util';

const SEARCH_EMPLOYEES = `
  query SearchEmployees($searchTerm: String) {
    searchEmployees(searchTerm: $searchTerm) {
      id
      firstName
      lastName
      age
      doj
      title
      department
      employeeType
      currentStatus
    }
  }
`;

function EmployeeSearch({ onSearchResults }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      try {
        const result = await graphQLCommand(SEARCH_EMPLOYEES, {
          searchTerm: searchTerm.trim()
        });
        console.log('Search results:', result.searchEmployees);
        onSearchResults(result.searchEmployees, searchTerm);
      } catch (error) {
        console.error('Error searching employees:', error);
        onSearchResults([], searchTerm);
      }
    } else {
      onSearchResults([]);
    }
  }

  return (
    <Form className='d-flex' onSubmit={handleSearch}>
      <Form.Control
        type='search'
        placeholder='Search'
        className='me-2'
        aria-label='Search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant='outline-success' type='submit'>Search</Button>
    </Form>
  );
}

export default EmployeeSearch;