import React from 'react';
import TableRow from './EmployeeRow';
import { Table } from 'react-bootstrap';

function EmployeeTable({ employees, deleteHandler }) {
  // console.log('EmployeeTable received employees:', employees);

  return (
    <Table hover>
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
        {employees.length > 0 ? (
          employees.map((employee, idx) => {
            // console.log(`Rendering employee ${idx}:`, employee);
            return (
              <TableRow
                key={employee.id || idx}
                rowData={employee}
                deleteHandler={deleteHandler}
              />
            );
          })
        ) : (
          <tr>
            <td colSpan={9}>No employees found.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default EmployeeTable;
