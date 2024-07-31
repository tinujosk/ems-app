import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import avatar from '../images/avatar.png';
import { graphQLCommand } from '../util';
import '../App.css';
import { Container, Col, Row } from 'react-bootstrap';

async function fetchEmployee(id) {
  const query = `query { 
  getEmployee(id: "${id}") {
     id, firstName, lastName, age, doj, title, department, employeeType, currentStatus 
    } 
  }`;

  const data = await graphQLCommand(query);
  return data?.getEmployee;
}

const EmployeeView = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const apiFunction = async () => {
      const data = await fetchEmployee(id);
      setEmployee(data);
    };
    apiFunction();
  }, []);

  return (
    <Container>
      <Row className='p-5'>
        <Col>
          <img
            src={avatar}
            alt={`${employee.firstName} ${employee.lastName}`}
            className='avatarImage'
          />
        </Col>
        <Col>
          <h2>{`${employee.firstName} ${employee.lastName}`}</h2>
          <p>
            <strong>Age:</strong> {employee.age}
          </p>
          <p>
            <strong>Date of Joining:</strong> {employee.doj}
          </p>
          <p>
            <strong>Title:</strong> {employee.title}
          </p>
          <p>
            <strong>Department:</strong> {employee.department}
          </p>
          <p>
            <strong>Employee Type:</strong> {employee.employeeType}
          </p>
          <p>
            <strong>Current Status:</strong>{' '}
            {employee.currentStatus === 1 ? 'Working' : 'Retired'}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeView;
