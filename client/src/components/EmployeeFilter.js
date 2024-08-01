import React from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { Form, Container, Button } from 'react-bootstrap';


export default function EmployeeFilter() {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const type = searchParams.get('Type');

  return (
    <Container className='d-flex justify-content-center align-items-center p-2'>
      <Button variant='outline-primary m-2' className={searchParams.get("Retiring") ? 'active': ''}>
        <Link
            to={{ pathname: '/employees', search: `?${createSearchParams({...Object.fromEntries(searchParams.entries()), Retiring: true})}` }}
            className='custom-link d-flex align-items-center justify-content-around'
          >
          Upcoming Retirements
        </Link>
      </Button>
      <Button variant='outline-primary m-2'>
        <Link
          to={{ pathname: '/employees', search: `?${createSearchParams({...Object.fromEntries(searchParams.entries()), Type: "FullTime" })}` }}
          className='custom-link'
        >
          FullTime Employees
        </Link>
      </Button>
      <Button variant='outline-secondary m-2'>
        <Link to='/employees' className='custom-link'>
          Reset Filter
        </Link>
      </Button>
      <Form.Select
        name='type'
        value={type || ''}
        onChange={e => {
          navigate(`/employees?${createSearchParams({...Object.fromEntries(searchParams.entries()), Type: e.target.value })}`);
        }}
        className='m-2 custom-select'
      >
        <option value='' disabled>
          Employee Type
        </option>
        <option value='FullTime'>FullTime</option>
        <option value='PartTime'>PartTime</option>
        <option value='Contract'>Contract</option>
        <option value='Seasonal'>Seasonal</option>
      </Form.Select>
    </Container>
  );
}
