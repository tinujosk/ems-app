import React, { useEffect, useState } from 'react';
import styles from './EmployeeCreate.module.css';

function EmployeeCreate() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dateOfJoining: '',
    title: '',
    department: '',
    employeeType: '',
  });
  const [error, setError] = useState({});

  const isErrors = Object.keys(error).length;
  const errorClasses = `${styles.generalError} ${
    !isErrors && styles.displayNone
  }`;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log('checking form', form);
  }, [form]);

  return (
    <div className={styles.formContainer}>
      <div className={errorClasses}>Please resolve the errors in the form</div>
      <form id='employeeForm'>
        <legend className={styles.formLegend}>Add New Employee </legend>
        <fieldset className={styles.employeeForm}>
          <div class={styles.formGroup}>
            <input
              type='text'
              id='firstName'
              name='firstName'
              placeholder='First Name'
              onChange={handleChange}
              required
            />
            <span className={styles.error}>{error.firstName}</span>
          </div>
          <div class={styles.formGroup}>
            <input
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Last Name'
              onChange={handleChange}
              required
            />
          </div>
          <div class={styles.formGroup}>
            <input
              type='number'
              id='age'
              name='age'
              placeholder='Age'
              onChange={handleChange}
              required
            />
          </div>
          <div class={styles.formGroup}>
            <input
              type='date'
              id='dateOfJoining'
              name='dateOfJoining'
              placeholder='Date of Joining'
              onChange={handleChange}
              required
            />
          </div>
          <div class={styles.formGroup}>
            <input
              type='text'
              id='title'
              name='title'
              placeholder='Title'
              onChange={handleChange}
              required
            />
          </div>
          <div class={styles.formGroup}>
            <input
              type='text'
              id='department'
              name='department'
              placeholder='Department'
              onChange={handleChange}
              required
            />
          </div>
          <div class={styles.formGroup}>
            <select
              id='employeeType'
              name='employeeType'
              onChange={handleChange}
              required
            >
              <option value='' disabled selected>
                Employee Type
              </option>
              <option value='Full-Time'>Full-Time</option>
              <option value='Part-Time'>Part-Time</option>
            </select>
          </div>
          <button type='submit'>Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default EmployeeCreate;
