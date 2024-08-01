import React, { useEffect, useState } from 'react';
import { nameRegex } from '../util';
import '../App.css';
import {
  Form,
  Button,
  Container,
  Alert,
  Card,
  Row,
  Col,
} from 'react-bootstrap';

function EmployeeForm({ apiFunction, editMode, values, disableFields }) {
  const [errors, setErrors] = useState({});
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    if (values) {
      setEmployee(values);
    }
  }, [values]);

  const handleChange = e => {
    const field = e.target.name;
    setEmployee({ ...employee, [field]: e.target.value.trim() });
    cleanFieldError(field);
  };

  const cleanFieldError = field => {
    if (errors[field]) {
      let formErrors = { ...errors };
      delete formErrors[field];
      setErrors(formErrors);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;

    if (validate(employee)) {
      const employeeData = {
        ...employee,
        age: parseInt(employee.age),
        currentStatus: editMode ? parseInt(employee.currentStatus) : 1, // Setting currentStatus as 1(Working) if new employee
      };

      await apiFunction(employeeData);
      setEmployee({});
      form.reset();
    }
  };

  const validate = form => {
    let formErrors = { ...errors };
    const nameMapping = {
      firstName: 'First Name',
      lastName: 'Last Name',
      age: 'Age',
      doj: 'Date of Joining',
      title: 'Title',
      department: 'Department',
      employeeType: 'Employee Type',
    };

    Object.keys(nameMapping).forEach(field => {
      const fieldValue = form[field];
      if (fieldValue === '' || fieldValue === undefined) {
        formErrors[field] = `${nameMapping[field]} is required`;
      } else {
        switch (field) {
          case 'firstName':
          case 'lastName':
            if (!nameRegex.test(fieldValue)) {
              formErrors[field] = `${nameMapping[field]} is not valid`;
            }
            break;
          case 'age':
            if (parseInt(fieldValue) < 20 || parseInt(fieldValue) > 70) {
              formErrors[
                field
              ] = `${nameMapping[field]}  should be between 20 and 70`;
            }
            break;
          default:
            delete formErrors[field];
        }
      }
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  return (
    <Container fluid className='w-75'>
      <Alert show={Object.keys(errors).length} variant='danger'>
        Please resolve the errors in the form
      </Alert>

      <Card
        border={Object.keys(errors).length ? 'danger' : 'success'}
        bg='light'
      >
        <Card.Header>
          {editMode ? 'Edit Employee' : 'Add New Employee'}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <Form id='employeeForm' onSubmit={handleSubmit}>
              <fieldset>
                <Row className='g-3'>
                  <Col xs={12} md={3}>
                    <Form.Group>
                      <Form.Control
                        type='text'
                        id='firstName'
                        name='firstName'
                        placeholder='First Name'
                        value={employee.firstName || ''}
                        onChange={handleChange}
                        disabled={disableFields?.includes('firstName')}
                      />
                      <span className='error'>{errors.firstName}</span>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={3}>
                    <Form.Group>
                      <Form.Control
                        type='text'
                        id='lastName'
                        name='lastName'
                        placeholder='Last Name'
                        value={employee.lastName || ''}
                        onChange={handleChange}
                        disabled={disableFields?.includes('lastName')}
                      />
                      <span className='error'>{errors.lastName}</span>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={3}>
                    <Form.Group>
                      <Form.Control
                        type='number'
                        id='age'
                        name='age'
                        placeholder='Age'
                        value={employee.age || ''}
                        onChange={handleChange}
                        disabled={disableFields?.includes('age')}
                      />
                      <span className='error'>{errors.age}</span>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={3}>
                    <Form.Group>
                      <Form.Control
                        type='date'
                        id='doj'
                        name='doj'
                        placeholder='Date of Joining'
                        value={employee.doj || ''}
                        onChange={handleChange}
                        disabled={disableFields?.includes('doj')}
                      />
                      <span className='error'>{errors.doj}</span>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={3}>
                    <Form.Group>
                      <Form.Select
                        id='title'
                        name='title'
                        value={employee.title || ''}
                        onChange={handleChange}
                        disabled={disableFields?.includes('title')}
                      >
                        <option value='' disabled>
                          Title
                        </option>
                        <option value='Employee'>Employee</option>
                        <option value='Manager'>Manager</option>
                        <option value='Director'>Director</option>
                        <option value='VP'>VP</option>
                      </Form.Select>
                      <span className='error'>{errors.title}</span>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={3}>
                    <Form.Group>
                      <Form.Select
                        id='department'
                        name='department'
                        value={employee.department || ''}
                        onChange={handleChange}
                        disabled={disableFields?.includes('department')}
                      >
                        <option value='' disabled>
                          Department
                        </option>
                        <option value='IT'>IT</option>
                        <option value='Marketing'>Marketing</option>
                        <option value='HR'>HR</option>
                        <option value='Engineering'>Engineering</option>
                      </Form.Select>
                      <span className='error'>{errors.department}</span>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={3}>
                    <Form.Group>
                      <Form.Select
                        id='employeeType'
                        name='employeeType'
                        value={employee.employeeType || ''}
                        onChange={handleChange}
                        disabled={disableFields?.includes('employeeType')}
                      >
                        <option value='' disabled>
                          Employee Type
                        </option>
                        <option value='FullTime'>FullTime</option>
                        <option value='PartTime'>PartTime</option>
                        <option value='Contract'>Contract</option>
                        <option value='Seasonal'>Seasonal</option>
                      </Form.Select>
                      <span className='error'>{errors.employeeType}</span>
                    </Form.Group>
                  </Col>
                  {editMode && (
                    <Col xs={12} md={3}>
                      <Form.Group>
                        <Form.Select
                          id='currentStatus'
                          name='currentStatus'
                          value={String(employee.currentStatus) || ''}
                          onChange={handleChange}
                          disabled={disableFields?.includes('currentStatus')}
                        >
                          <option value='' disabled>
                            Current Status
                          </option>
                          <option value='1'>Working</option>
                          <option value='0'>Retired</option>
                        </Form.Select>
                        <span className='error'>{errors.employeeType}</span>
                      </Form.Group>
                    </Col>
                  )}
                  <Col xs={12} md={3}>
                    <Button type='submit' className='w-100'>
                      Submit
                    </Button>
                  </Col>
                </Row>
              </fieldset>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EmployeeForm;
