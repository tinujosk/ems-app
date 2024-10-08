import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeForm from './EmployeeForm';
import { graphQLCommand } from '../util';
import { Container } from 'react-bootstrap';

//Fetch Employee
async function fetchEmployee(id) {
  const query = `query { 
  getEmployee(id: "${id}") {
     id, firstName, lastName, age, doj, title, department, employeeType, currentStatus 
    } 
  }`;

  const data = await graphQLCommand(query);
  return data?.getEmployee;
}

// Edit Employee
async function postEmployee(id, employee) {
  const query = `mutation editEmployee($id:String!, $employee:EditInputEmployee!) {
  editEmployee(id: $id, employee: $employee) {title, department, currentStatus}
   }`;

  const data = await graphQLCommand(query, { id, employee });
  return data?.editEmployee;
}

function EmployeeEdit() {
  const [employee, setEmployee] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const apiFunction = async () => {
      const data = await fetchEmployee(id);
      setEmployee(data);
    };
    apiFunction();
  }, []);

  const editOneEmployee = async employee => {
    const employeeUpdate = {
      title: employee.title,
      department: employee.department,
      currentStatus: employee.currentStatus,
    };
    const result = await postEmployee(id, employeeUpdate);
    if (result) navigate('/employees');
  };

  return (
    <Container className='p-5 d-flex flex-column align-items-center'>
      <h2 className='text-muted p-5'>
        {`Edit ${employee.firstName}'s Details`}
      </h2>
      <EmployeeForm
        apiFunction={editOneEmployee}
        values={employee}
        editMode
        disableFields={['firstName', 'lastName', 'age', 'doj', 'employeeType']}
      />
    </Container>
  );
}

export default EmployeeEdit;
