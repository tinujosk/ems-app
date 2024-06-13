import React from 'react';
import employeeData from '../employeeList.json';
import styles from './EmployeeTable.module.css';

function EmployeeTable() {
  return (
    <table class={styles.table}>
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
        {employeeData.map(employee => {
          return (
            <tr>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.age}</td>
              <td>{employee.dateOfJoining}</td>
              <td>{employee.title}</td>
              <td>{employee.department}</td>
              <td>{employee.employeeType}</td>
              <td>{employee.currentStatus}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
