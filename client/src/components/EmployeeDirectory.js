import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmployeeSearch from './EmployeeSearch';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import EmployeeFilter from './EmployeeFilter';
import { graphQLCommand } from '../util';
import '../App.css';

// Fetch Employees data
async function fetchEmployees(type) {
  const data = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query {
          getEmployees(type:${type}){id, firstName, lastName, age, doj, title, department, employeeType, currentStatus}
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
  const [searchParams, _] = useSearchParams();
  const type = searchParams.get('Type');

  useEffect(() => {
    const apiFunction = async () => {
      const data = await fetchEmployees(type);
      setEmployees(data);
    };
    apiFunction();
  }, [type]);

  const setOneEmployee = async employee => {
    await postEmployee(employee);
    const data = await fetchEmployees(type);
    setEmployees(data);
  };

  const deleteEmployee = async id => {
    const query = `mutation {
      deleteEmployee(id: "${id}") 
    }`;
    const result = await graphQLCommand(query);
    if (result.deleteEmployee) {
      const data = await fetchEmployees(type);
      setEmployees(data);
    }
  };

  return (
    <div className='container'>
      <div className='subContainer'>
        <EmployeeSearch />
        <EmployeeFilter />
        <div className='tableContainer'>
          {employees.length ? (
            <EmployeeTable
              employees={employees}
              deleteHandler={deleteEmployee}
            />
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
