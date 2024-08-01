import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import EmployeeFilter from './EmployeeFilter';
import { graphQLCommand } from '../util';
import { Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import { DateTime } from "luxon";

const RETIREMENT_AGE = 65;

// Fetch Employees data
async function fetchEmployees(type) {
  const query = `query {
  getEmployees(type:${type}){id, firstName, lastName, age, doj, title, department, employeeType, currentStatus}
  }`;

  const data = await graphQLCommand(query);
  return data?.getEmployees;
}

// Add a new Employee
async function postEmployee(employee) {
  const query = `mutation addEmployee($input:InputEmployee!) {
  addEmployee(employee: $input) {firstName, lastName, age, doj, title, department, employeeType, currentStatus}
  }`;

  await graphQLCommand(query, { input: employee });
}


// function to check if the employee is retiring in six months
function isEmployeeRetiring(employee) {
  let { age, doj } = employee;
  // we will consider the date and month from date of joining for date of birth
  // i.e if dob = "2024-07-23" and age is 62, we will assume the dob as "(2024-62)-07-23" = "1962-07-23"
  doj = DateTime.fromISO(doj);
  const dob = doj.minus({ years: age });

  const now = DateTime.now();
  const sixMonthsFromNow = now.plus({ months: 6});
  const isRetiringInSixMonths =  sixMonthsFromNow.diff(dob).as("years") > RETIREMENT_AGE;
  return isRetiringInSixMonths;
}

function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [searchParams, _] = useSearchParams();
  const [toast, setToast] = useState({
    show: false,
    type: '',
    message: '',
  });
  const type = searchParams.get('Type');
  // we will take either `"true"` or `"1"` for the flag
  const retiring =  ["true", "1"].includes(searchParams.get('Retiring'));

  useEffect(() => {
    const apiFunction = async () => {
      let data = await fetchEmployees(type);
      // if retiring filter is on, we will filter the employee based on their age
      if (retiring) {
        data = data.filter(isEmployeeRetiring);
      }
      setEmployees(data);
    };
    apiFunction();
  }, [type, retiring]);

  const setOneEmployee = async employee => {
    await postEmployee(employee);
    const data = await fetchEmployees(type);
    setEmployees(data);
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
      const query = `mutation {
        deleteEmployee(id: "${id}") 
      }`;
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this employee?'
      );
      if (isConfirmed) {
        const result = await graphQLCommand(query);
        if (result.deleteEmployee) {
          const data = await fetchEmployees(type);
          setEmployees(data);
        }
      }
    }
  };

  return (
    <>
      <Row className='p-5'>
        <Col>Will put something here</Col>
        <Col>
          <EmployeeFilter />
        </Col>
      </Row>
      <Row className='p-5 d-flex justify-content-center'>
        {employees.length ? (
          <EmployeeTable employees={employees} deleteHandler={deleteEmployee} />
        ) : (
          <div className='noData'>
            {`No ${type || ''} employees! Please add using the below form`}
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
          onClose={() => setToast({ show: false, message: '' })}
          show={toast.show}
          delay={3000}
          bg={toast.type}
          autohide
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
