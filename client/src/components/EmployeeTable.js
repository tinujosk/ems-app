import React from 'react';
import styles from './EmployeeTable.module.css';
import TableRow from './EmployeeRow';

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
        {employees.map((employee, idx) => {
          return <TableRow key={idx} rowData={employee} />;
        })}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
