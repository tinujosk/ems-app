import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function TableRow({ rowData, deleteHandler }) {
  const isRetired = rowData.currentStatus === 0;
  return (
    <tr>
      <td>{rowData.firstName}</td>
      <td>{rowData.lastName}</td>
      <td>{rowData.age}</td>
      <td>{new Date(rowData.doj).toDateString()}</td>
      <td>{rowData.title}</td>
      <td>{rowData.department}</td>
      <td>{rowData.employeeType}</td>
      <td style={{ color: isRetired ? 'red' : '' }}>
        {isRetired ? 'Retired' : 'Working'}
      </td>
      <td>
        <Link to={`view/${rowData.id}`} className='px-2'>
          <FontAwesomeIcon icon={faEye} />
        </Link>
        <Link to={`edit/${rowData.id}`} className='px-2'>
          <FontAwesomeIcon icon={faEdit} />
        </Link>
        <Link
          onClick={() => {
            deleteHandler(rowData.id);
          }}
          className='px-2'
        >
          <FontAwesomeIcon icon={faTrash} />
        </Link>
      </td>
    </tr>
  );
}

export default TableRow;
