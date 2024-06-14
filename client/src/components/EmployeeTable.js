import React from 'react';
import styles from './EmployeeTable.module.css';

function EmployeeTable({ employees }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Date of Joining</th>
          <th>Title</th>
          <th>Department</th>
          <th>Employee Type</th>
          <th>Current Status</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => {
          return (
            <tr>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.age}</td>
              <td>{new Date(employee.doj).toDateString()}</td>
              <td>{employee.title}</td>
              <td>{employee.department}</td>
              <td>{employee.employeeType}</td>
              <td>{employee.currentStatus === 1 ? 'Working' : 'Resigned'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
