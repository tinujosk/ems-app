import React, { useEffect, useState } from 'react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeCreate from './EmployeeCreate';
import EmployeeTable from './EmployeeTable';
import styles from './EmployeeDirectory.module.css';

async function fetchData() {
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
  return json.data.getEmployees;
}

async function postEmployee(employee) {
  console.log('strict check', employee);
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
  console.log('checking add employee', json);
  return json.data.addEmployee;
}

function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const apiFunction = async () => {
      const data = await fetchData();
      setEmployees(data);
    };
    apiFunction();
  }, []);

  const setOneEmployee = async employee => {
    employee = await postEmployee(employee);
    console.log('Adding issue...', employee);
    setEmployees([...employees, employee]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.appHeader}>
        <h1 className={styles.appTitle}>Employee Management System</h1>
      </div>
      <div className={styles.subContainer}>
        <EmployeeSearch />
        <EmployeeTable employees={employees} />
        <EmployeeCreate setOneEmployee={setOneEmployee} />
      </div>
    </div>
  );
}

export default EmployeeDirectory;
