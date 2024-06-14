import React, { useState } from 'react';
import styles from './EmployeeCreate.module.css';
import { nameRegex } from '../util';

function EmployeeCreate({ setOneEmployee }) {
  const [errors, setErrors] = useState({});

  const errorClasses = `${styles.generalError} ${
    !Object.keys(errors).length && styles.displayNone
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

      await setOneEmployee(employee);
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
    <div className={styles.formContainer}>
      <div className={errorClasses}>Please resolve the errors in the form</div>
      <form id='employeeForm' onSubmit={handleSubmit}>
        <legend className={styles.formLegend}>Add New Employee </legend>
        <fieldset className={styles.employeeForm}>
          <div className={styles.formGroup}>
            <input
              type='text'
              id='firstName'
              name='firstName'
              placeholder='First Name'
            />
            <span className={styles.error}>{errors.firstName}</span>
          </div>
          <div className={styles.formGroup}>
            <input
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Last Name'
            />
            <span className={styles.error}>{errors.lastName}</span>
          </div>
          <div className={styles.formGroup}>
            <input type='number' id='age' name='age' placeholder='Age' />
            <span className={styles.error}>{errors.age}</span>
          </div>
          <div className={styles.formGroup}>
            <input
              type='date'
              id='doj'
              name='doj'
              placeholder='Date of Joining'
            />
            <span className={styles.error}>{errors.doj}</span>
          </div>
          <div className={styles.formGroup}>
            <select id='title' name='title' defaultValue={''}>
              <option value='' disabled>
                Title
              </option>
              <option value='Employee'>Employee</option>
              <option value='Manager'>Manager</option>
              <option value='Director'>Director</option>
              <option value='VP'>VP</option>
            </select>
            <span className={styles.error}>{errors.title}</span>
          </div>
          <div className={styles.formGroup}>
            <select id='department' name='department' defaultValue={''}>
              <option value='' disabled>
                Department
              </option>
              <option value='IT'>IT</option>
              <option value='Marketing'>Marketing</option>
              <option value='HR'>HR</option>
              <option value='Engineering'>Engineering</option>
            </select>
            <span className={styles.error}>{errors.department}</span>
          </div>
          <div className={styles.formGroup}>
            <select id='employeeType' name='employeeType' defaultValue={''}>
              <option value='' disabled>
                Employee Type
              </option>
              <option value='FullTime'>FullTime</option>
              <option value='PartTime'>PartTime</option>
              <option value='Contract'>Contract</option>
              <option value='Seasonal'>Seasonal</option>
            </select>
            <span className={styles.error}>{errors.employeeType}</span>
          </div>
          <button type='submit'>Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default EmployeeCreate;
