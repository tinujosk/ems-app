import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import avatar from '../images/avatar.png';
import { graphQLCommand } from '../util';
import { Container, Col, Card, Badge } from 'react-bootstrap';
import { DateTime } from "luxon";

const RETIREMENT_AGE = 65;


async function fetchEmployee(id) {
  const query = `query { 
  getEmployee(id: "${id}") {
     id, firstName, lastName, age, doj, title, department, employeeType, currentStatus 
    } 
  }`;

  const data = await graphQLCommand(query);
  return data?.getEmployee;
}

function getRetiringTime(employee) {
  let { age, doj } = employee;
  // we will consider the date and month from date of joining for date of birth
  // i.e if dob = "2024-07-23" and age is 62, we will assume the dob as "(2024-62)-07-23" = "1962-07-23"
  doj = DateTime.fromISO(doj);

  const dob = doj.minus({ years: age });
  const retirement = dob.plus({ years: RETIREMENT_AGE });

  const timeTill = retirement.diff(DateTime.now(), ['years', 'months', 'days']).toObject();

  return `${Math.floor(timeTill.days)} days, ${timeTill.months} months, ${timeTill.years} years`;

}

const EmployeeView = () => {
  const [employee, setEmployee] = useState([]);
  const [retiringTime, setRetiringTime] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const apiFunction = async () => {
      const data = await fetchEmployee(id);
      setEmployee(data);
      setRetiringTime(getRetiringTime(data));
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
        <Card.Header className='d-flex justify-content-center flex-column align-items-center'>
          <h2 className='text-center'>{`${employee.firstName} ${employee.lastName}`}</h2>
          {/* <div className=''>Retiring in <span className='badge rounded-pill bg-primary'>{ retiringTime }</span></div> */}
          <p className='fw-bold fst-italic'>Retiring in <Badge pill bg='dark'>{ retiringTime }</Badge></p>
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
