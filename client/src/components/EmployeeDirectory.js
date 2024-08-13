import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import { DateTime, Interval } from 'luxon';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import EmployeeFilter from './EmployeeFilter';
import { graphQLCommand } from '../util';

async function fetchEmployees(type, searchTerm) {
  const query = `
    query getEmployees($type: EmployeeType, $searchTerm: String) {
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

  const data = await graphQLCommand(query, { type, searchTerm });
  return data?.getEmployees;
}

async function postEmployee(employee) {
  const query = `
    mutation addEmployee($input: InputEmployee!) {
      addEmployee(employee: $input) {
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

  await graphQLCommand(query, { input: employee });
}

function isEmployeeRetiring(employee) {
  let { age, doj } = employee;
  doj = DateTime.fromISO(doj);
  const dob = doj.minus({ years: age + 1 });
  const now = DateTime.now();
  const sixtyFifthBirthday = dob.plus({ years: 65 });
  const sixMonthsFromNow = now.plus({ months: 6 });

  return Interval.fromDateTimes(now, sixMonthsFromNow).contains(
    sixtyFifthBirthday
  );
}

function EmployeeDirectory({ searchTerm }) {
  const [employees, setEmployees] = useState([]);
  const [searchParams, _] = useSearchParams();
  const [toast, setToast] = useState({
    show: false,
    type: '',
    message: '',
  });

  const type = searchParams.get('Type');
  const retiring = ['true', '1'].includes(searchParams.get('Retiring'));

  const fetchAndSetEmployees = async () => {
    try {
      let data = await fetchEmployees(type, searchTerm);
      if (retiring) {
        data = data.filter(isEmployeeRetiring);
      }
      setEmployees(data);
    } catch (error) {
      setToast({
        show: true,
        type: 'danger',
        message: 'Error fetching employees. Please try again.',
      });
    }
  };

  useEffect(() => {
    fetchAndSetEmployees();
  }, [type, retiring, searchTerm]);

  const setOneEmployee = async employee => {
    try {
      await postEmployee(employee);
      fetchAndSetEmployees();
    } catch (error) {
      setToast({
        show: true,
        type: 'danger',
        message: 'Error adding employee. Please try again.',
      });
    }
  };

  const deleteEmployee = async id => {
    const employee = employees.find(employee => employee.id == id);
    if (employee.currentStatus === 1) {
      setToast({
        show: true,
        type: 'danger',
        message: 'Cannot delete employees in Working Status',
      });
    } else {
      const query = `mutation { deleteEmployee(id: "${id}") }`;
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

  return (
    <>
      <Row className='p-5'>
        {searchTerm && (
          <Row className='text-center p-3'>
            <h2>{`Search results for "${searchTerm}"`}</h2>
          </Row>
        )}
        <Col>
          <EmployeeFilter />
        </Col>
      </Row>
      <Row className='d-flex justify-content-center table-container'>
        {employees.length ? (
          <EmployeeTable employees={employees} deleteHandler={deleteEmployee} />
        ) : (
          <div className='noData'>
            No matching results found. Please modify your search or add a new
            employee using the form below.
          </div>
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
          onClose={() => setToast({ show: false, type: '', message: '' })}
          show={toast.show}
          delay={3000}
          bg={toast.type}
          autohide={true}
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
