import React from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Container, Button } from 'react-bootstrap';

export default function EmployeeFilter({ onReset }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('Type');
  const retiring = searchParams.get('Retiring') === 'true';

  const handleReset = () => {
    // Reset all filters and search query
    navigate(`/employees?${createSearchParams({})}`);
    if (onReset) {
      onReset(); // Call parent component reset
    }
  };

  return (
    <Container className='d-flex justify-content-center align-items-center p-2'>
      <Button 
        variant='outline-primary m-2' 
        className={retiring ? 'active' : ''}
        onClick={() => {
          navigate(`/employees?${createSearchParams({ ...Object.fromEntries(searchParams.entries()), Retiring: 'true' })}`);
        }}
      >
        Upcoming Retirements
      </Button>
      <Button 
        variant='outline-primary m-2' 
        className={type === 'FullTime' ? 'active' : ''}
        onClick={() => {
          navigate(`/employees?${createSearchParams({ ...Object.fromEntries(searchParams.entries()), Type: 'FullTime' })}`);
        }}
      >
        Full-Time Employees
      </Button>
      <Button 
        variant='outline-secondary m-2' 
        onClick={handleReset}
      >
        Reset Filters
      </Button>
      <Form.Select
        name='type'
        value={type || ''}
        onChange={e => {
          navigate(`/employees?${createSearchParams({ ...Object.fromEntries(searchParams.entries()), Type: e.target.value })}`);
        }}
        className='m-2 custom-select'
        aria-label='Select employee type'
      >
        <option value='' disabled>
          Employee Type
        </option>
        <option value='FullTime'>Full-Time</option>
        <option value='PartTime'>Part-Time</option>
        <option value='Contract'>Contract</option>
        <option value='Seasonal'>Seasonal</option>
      </Form.Select>
    </Container>
  );
}
