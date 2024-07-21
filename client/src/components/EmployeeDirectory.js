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
  };

  return (
    <div className='container'>
      <div className='subContainer'>
        <div className='toolbarContainer'>
          <EmployeeSearch />
          <EmployeeFilter />
        </div>
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
