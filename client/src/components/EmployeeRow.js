import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function TableRow({ rowData, deleteHandler }) {
  return (
    <tr>
      <td>{rowData.firstName}</td>
      <td>{rowData.lastName}</td>
      <td>{rowData.age}</td>
      <td>{new Date(rowData.doj).toDateString()}</td>
      <td>{rowData.title}</td>
      <td>{rowData.department}</td>
      <td>{rowData.employeeType}</td>
      <td>{rowData.currentStatus === 1 ? 'Working' : 'Retired'}</td>
      <td>
        <Link to={`view/${rowData.id}`}>View</Link> |
        <Link to={`edit/${rowData.id}`}>Edit</Link> |
        <Link
          onClick={() => {
            deleteHandler(rowData.id);
          }}
        >
          Delete
        </Link>{' '}
        |
      </td>
    </tr>
  );
}

export default TableRow;
