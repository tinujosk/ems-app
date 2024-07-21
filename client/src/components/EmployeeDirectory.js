import React, { useEffect, useState } from 'react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import '../App.css';

// Fetch Employees data
async function fetchEmployees() {
  const data = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query {
          getEmployees{id, firstName, lastName, age, doj, title, department, employeeType, currentStatus}
        }`,
    }),
  });

  const json = await data.json();
  return json?.data?.getEmployees;
}

// Add a new Employee
async function postEmployee(employee) {
  const data = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `mutation addEmployee($input:InputEmployee!) {
            addEmployee(employee: $input) {firstName, lastName, age, doj, title, department, employeeType, currentStatus}
         }`,
      variables: { input: employee },
    }),
  });

  const json = await data.json();
  return json?.data?.addEmployee;
}

function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const apiFunction = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };
    apiFunction();
  }, []);

  const setOneEmployee = async employee => {
    await postEmployee(employee);
    const data = await fetchEmployees();
    setEmployees(data);
  };

  return (
    <div className='container'>
      <div className='subContainer'>
        <EmployeeSearch />
        <div className='tableContainer'>
          {employees.length ? (
            <EmployeeTable employees={employees} />
          ) : (
            <div className='noData'>
              No employees! Please add using the below form
            </div>
          )}
        </div>
        <EmployeeForm apiFunction={setOneEmployee} />
      </div>
    </div>
  );
}

export default EmployeeDirectory;
