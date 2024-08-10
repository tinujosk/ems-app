import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import EmployeeFilter from './EmployeeFilter';
import { graphQLCommand } from '../util';
import { Row, Col, Toast, ToastContainer, Button } from 'react-bootstrap';
import { DateTime } from "luxon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const RETIREMENT_AGE = 65;

async function fetchEmployees(type) {
  const query = `query {
    getEmployees(type:${type}){id, firstName, lastName, age, doj, title, department, employeeType, currentStatus}
  }`;

  const data = await graphQLCommand(query);
  return data?.getEmployees;
}

async function postEmployee(employee) {
  const query = `mutation addEmployee($input:InputEmployee!) {
    addEmployee(employee: $input) {firstName, lastName, age, doj, title, department, employeeType, currentStatus}
  }`;

  await graphQLCommand(query, { input: employee });
}

function isEmployeeRetiring(employee) {
  let { age, doj } = employee;
  doj = DateTime.fromISO(doj);
  const dob = doj.minus({ years: age });

  const now = DateTime.now();
  const sixMonthsFromNow = now.plus({ months: 6});
  const isRetiringInSixMonths =  sixMonthsFromNow.diff(dob).as("years") > RETIREMENT_AGE;
  return isRetiringInSixMonths;
}

function EmployeeDirectory({ searchResults, resetSearch }) {
  const [employees, setEmployees] = useState([]);
  const [searchParams] = useSearchParams();
  const [toast, setToast] = useState({
    show: false,
    type: '',
    message: '',
  });
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const type = searchParams.get('Type');
  const retiring = ["true", "1"].includes(searchParams.get('Retiring'));

  const fetchAndSetEmployees = useCallback(async () => {
    try {
      let data = await fetchEmployees(type);
      if (retiring) {
        data = data.filter(isEmployeeRetiring);
      }
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setToast({
        show: true,
        type: 'danger',
        message: 'Error fetching employees. Please try again.',
      });
    }
  }, [type, retiring]);

  useEffect(() => {
    if (searchResults !== null) {
      setIsSearchPerformed(true);
      if (searchResults.length > 0) {
        let filteredResults = searchResults;
        if (retiring) {
          filteredResults = filteredResults.filter(isEmployeeRetiring);
        }
        setEmployees(filteredResults);
      } else {
        setEmployees([]);
      }
    } else {
      setIsSearchPerformed(false);
      fetchAndSetEmployees();
    }
  }, [searchResults, retiring, fetchAndSetEmployees, searchParams]);

  const setOneEmployee = async (employee) => {
    try {
      await postEmployee(employee);
      fetchAndSetEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
      setToast({
        show: true,
        type: 'danger',
        message: 'Error adding employee. Please try again.',
      });
    }
  };

  const deleteEmployee = async (id) => {
    const employee = employees.find((employee) => employee.id == id);
    if (employee.currentStatus === 1) {
      setToast({
        show: true,
        type: 'danger',
        message: 'Cannot delete employees in Working Status',
      });
    } else {
      const query = `mutation {
        deleteEmployee(id: "${id}") 
      }`;
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this employee?'
      );
      if (isConfirmed) {
        try {
          const result = await graphQLCommand(query);
          if (result.deleteEmployee) {
            fetchAndSetEmployees();
          }
        } catch (error) {
          console.error('Error deleting employee:', error);
          setToast({
            show: true,
            type: 'danger',
            message: 'Error deleting employee. Please try again.',
          });
        }
      }
    }
  };

  const handleBackClick = () => {
    if (typeof resetSearch === 'function') {
      resetSearch();
    } else {
      console.error('resetSearch is not a function');
    }
  };

  return (
    <>
      <Row className='p-5'>
        <Col>
          
          <EmployeeFilter />
          {isSearchPerformed && (
            <Button 
              variant="link" 
              onClick={handleBackClick} 
              className="mb-3 d-flex align-items-center"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
              <span className="ms-2">All employees</span>
            </Button>
          )}
        </Col>
      </Row>
      <Row className='d-flex justify-content-center table-container'>
        {isSearchPerformed && employees.length === 0 && (
          <div className='noData'>
            No matching results found. Please modify your search or add a new employee using the form below.
          </div>
        )}
        {employees.length > 0 && (
          <>
            
            <EmployeeTable employees={employees} deleteHandler={deleteEmployee} />
          </>
        )}
        {!isSearchPerformed && employees.length === 0 && (
          <div className='loading'>Loading employees...</div>
        )}
      </Row>
      <Row className='p-5'>
        <EmployeeForm apiFunction={setOneEmployee} />
      </Row>
      <ToastContainer
        position='middle-center'
        className='p-3'
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setToast({ show: false, message: '' })}
          show={toast.show}
          delay={3000}
          bg={toast.type}
          autohide
          className='text-white'
        >
          <Toast.Header>
            <strong className='me-auto'>Error</strong>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default EmployeeDirectory;