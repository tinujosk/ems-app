import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { graphQLCommand } from '../util';

const GET_EMPLOYEES = `
  query GetEmployees($type: EmployeeType, $searchTerm: String) {
    getEmployees(type: $type, searchTerm: $searchTerm) {
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

function EmployeeSearch({ onSearchResults, type }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      try {
        const result = await graphQLCommand(GET_EMPLOYEES, {
          type: type || null,
          searchTerm: searchTerm.trim(),
        });
        console.log('Search results:', result.getEmployees);
        onSearchResults(result.getEmployees, searchTerm);
      } catch (error) {
        console.error('Error searching employees:', error);
        onSearchResults([], searchTerm);
      }
    } else {
      onSearchResults([]);
    }
  };

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
