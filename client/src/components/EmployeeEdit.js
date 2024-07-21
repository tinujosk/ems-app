import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import EmployeeForm from './EmployeeForm';
import '../App.css';

//Add a new Employee
async function fetchEmployee(id) {
  const data = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query { 
        getOneEmployee(id: "${id}") {
           id, firstName, lastName, age, doj, title, department, employeeType, currentStatus 
          } 
        }`,
    }),
  });

  const json = await data.json();
  return json?.data?.getOneEmployee;
}


function EmployeeEdit() {
  const [employee, setEmployee] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const apiFunction = async () => {
      const data = await fetchEmployee(id);
      console.log('cehcking employee one', data)
      setEmployee(data);
    };
    apiFunction();
  }, []);

  // const setOneEmployee = async employee => {
  //   await postEmployee(employee);
  //   const data = await fetchEmployees();
  //   setEmployees(data);
  // };

  return (
    <div className='container'>
      <div className='subContainer'>
        <EmployeeForm apiFunction={() => { }} editMode values={employee} />
      </div>
    </div>
  );
}

export default EmployeeEdit;
