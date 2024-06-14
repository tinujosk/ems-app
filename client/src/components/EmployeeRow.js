import React from 'react';

function TableRow({ rowData }) {
  return (
    <tr>
      <td>{rowData.firstName}</td>
      <td>{rowData.lastName}</td>
      <td>{rowData.age}</td>
      <td>{new Date(rowData.doj).toDateString()}</td>
      <td>{rowData.title}</td>
      <td>{rowData.department}</td>
      <td>{rowData.employeeType}</td>
      <td>{rowData.currentStatus === 1 ? 'Working' : 'Resigned'}</td>
    </tr>
  );
}

export default TableRow;
