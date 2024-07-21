import React from 'react';
import TableRow from './EmployeeRow';
import '../App.css';

function EmployeeTable({ employees, deleteHandler }) {
  return (
    <table className='table'>
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
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, idx) => {
          return (
            <TableRow
              key={idx}
              rowData={employee}
              deleteHandler={deleteHandler}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
