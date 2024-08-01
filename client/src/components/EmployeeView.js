import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import avatar from '../images/avatar.png';
import { graphQLCommand } from '../util';
import { Container, Col, Card } from 'react-bootstrap';

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
    <Container className='d-flex justify-content-center align-items-center h-100 p-5'>
      <Card className='shadow'>
        <Card.Img
          className='w-50 mx-auto d-block rounded-circle mt-3 p-3'
          variant='top'
          src={avatar}
        />
        <Card.Header>
          <h2 className='text-center'>{`${employee.firstName} ${employee.lastName}`}</h2>
        </Card.Header>
        <Card.Body>
          <Card.Title>Other Employee Details</Card.Title>
          <Card.Text>
            <Col>
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
          </Card.Text>
        </Card.Body>
        <Card.Footer className='text-muted'>
          &copy; Employee Management System. All Rights Reserved 2024
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default EmployeeView;
