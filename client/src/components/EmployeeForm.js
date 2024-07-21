import React, { useState } from 'react';
import { nameRegex } from '../util';
import '../App.css';

function EmployeeForm({ apiFunction, editMode, values }) {
  const [errors, setErrors] = useState({});

  const errorClasses = `generalError ${!Object.keys(errors).length && 'displayNone'
    }`;

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;

    if (validate(form)) {
      const employee = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        age: parseInt(form.age.value),
        doj: form.doj.value,
        title: form.title.value,
        department: form.department.value,
        employeeType: form.employeeType.value,
        currentStatus: 1, // Setting currentStatus as 1(Working)
      };

      await apiFunction(employee);
      form.reset();
    }
  };

  const validate = form => {
    let errors = {};
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
      const fieldValue = form[field].value;
      if (fieldValue === '') {
        errors[field] = `${nameMapping[field]} is required`;
      } else {
        switch (field) {
          case 'firstName':
          case 'lastName':
            if (!nameRegex.test(fieldValue)) {
              errors[field] = `${nameMapping[field]} is not valid`;
            } else {
              delete errors[field];
            }
            break;
          case 'age':
            if (parseInt(fieldValue) < 20 || parseInt(fieldValue) > 70) {
              errors[
                field
              ] = `${nameMapping[field]}  should be between 20 and 70`;
            } else {
              delete errors[field];
            }
            break;
          default:
            delete errors[field];
        }
      }
    });

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className='formContainer'>
      <div className={errorClasses}>Please resolve the errors in the form</div>
      <form id='employeeForm' onSubmit={handleSubmit}>
        <legend className='formLegend'>{editMode ? 'Edit Employee' : 'Add New Employee'} </legend>
        <fieldset className='employeeForm'>
          <div className='formGroup'>
            <input
              type='text'
              id='firstName'
              name='firstName'
              placeholder='First Name'
              value={values?.firstName}
            />
            <span className='error'>{errors.firstName}</span>
          </div>
          <div className='formGroup'>
            <input
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Last Name'
              value={values?.lastName}
            />
            <span className='error'>{errors.lastName}</span>
          </div>
          <div className='formGroup'>
            <input type='number' id='age' name='age' placeholder='Age' />
            <span className='error'>{errors.age}</span>
          </div>
          <div className='formGroup'>
            <input
              type='date'
              id='doj'
              name='doj'
              placeholder='Date of Joining'
              value={values?.doj}
            />
            <span className='error'>{errors.doj}</span>
          </div>
          <div className='formGroup'>
            <select id='title' name='title' defaultValue={''}>
              <option value={values?.title} disabled>
                Title
              </option>
              <option value='Employee'>Employee</option>
              <option value='Manager'>Manager</option>
              <option value='Director'>Director</option>
              <option value='VP'>VP</option>
            </select>
            <span className='error'>{errors.title}</span>
          </div>
          <div className='formGroup'>
            <select id='department' name='department' defaultValue={''}>
              <option value={values?.department} disabled>
                Department
              </option>
              <option value='IT'>IT</option>
              <option value='Marketing'>Marketing</option>
              <option value='HR'>HR</option>
              <option value='Engineering'>Engineering</option>
            </select>
            <span className='error'>{errors.department}</span>
          </div>
          <div className='formGroup'>
            <select id='employeeType' name='employeeType' defaultValue={''}>
              <option value={values?.employeeType} disabled>
                Employee Type
              </option>
              <option value='FullTime'>FullTime</option>
              <option value='PartTime'>PartTime</option>
              <option value='Contract'>Contract</option>
              <option value='Seasonal'>Seasonal</option>
            </select>
            <span className='error'>{errors.employeeType}</span>
          </div>
          <button type='submit'>Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default EmployeeForm;
