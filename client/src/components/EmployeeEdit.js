import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeForm from './EmployeeForm';
import '../App.css';

//Add a new Employee
async function fetchEmployee(id) {
  const data = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query { 
        getEmployee(id: "${id}") {
           id, firstName, lastName, age, doj, title, department, employeeType, currentStatus 
          } 
        }`,
    }),
  });

  const json = await data.json();
  return json?.data?.getEmployee;
}

// Add a new Employee
async function postEmployee(id, employee) {
  const data = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `mutation editEmployee($id:String!, $employee:EditInputEmployee!) {
        editEmployee(id: $id, employee: $employee) {title, department, currentStatus}
         }`,
      variables: { id, employee },
    }),
  });

  const json = await data.json();
  return json?.data?.editEmployee;
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
    <div className='container'>
      <div className='subContainer'>
        <EmployeeForm
          apiFunction={editOneEmployee}
          values={employee}
          editMode
          disableFields={[
            'firstName',
            'lastName',
            'age',
            'doj',
            'employeeType',
          ]}
        />
      </div>
    </div>
  );
}

export default EmployeeEdit;
