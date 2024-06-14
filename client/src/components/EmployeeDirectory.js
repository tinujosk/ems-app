import React, { useEffect, useState } from 'react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeCreate from './EmployeeCreate';
import EmployeeTable from './EmployeeTable';
import styles from './EmployeeDirectory.module.css';

// Fetch Employees data
async function fetchEmployees() {
  const data = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query {
          getEmployees{firstName, lastName, age, doj, title, department, employeeType, currentStatus}
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
    <div className={styles.container}>
      <div className={styles.appHeader}>
        <h1 className={styles.appTitle}>Employee Management System</h1>
      </div>
      <div className={styles.subContainer}>
        <EmployeeSearch />
        <div className={styles.tableContainer}>
          {employees.length ? (
            <EmployeeTable employees={employees} />
          ) : (
            <div className={styles.noData}>
              No employees! Please add using the below form
            </div>
          )}
        </div>
        <EmployeeCreate setOneEmployee={setOneEmployee} />
      </div>
    </div>
  );
}

export default EmployeeDirectory;
