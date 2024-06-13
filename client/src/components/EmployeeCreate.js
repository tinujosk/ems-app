import React, { useEffect, useState } from 'react';
import styles from './EmployeeCreate.module.css';
import { nameRegex } from '../util';

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
  const [errors, setErrors] = useState({});

  const errorClasses = `${styles.generalError} ${
    !Object.keys(errors).length && styles.displayNone
  }`;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      console.log('Form is valid, submitting...');
      // Submit form
    } else {
      console.log('Form is invalid, not submitting');
    }
  };

  const validate = () => {
    if (form.firstName.trim() === '') {
      setErrors(errors => ({
        ...errors,
        firstName: 'First Name is required',
      }));
    } else {
      if (!nameRegex.test(form.firstName.trim())) {
        setErrors(errors => ({
          ...errors,
          firstName: 'First Name is not valid',
        }));
      } else {
        setErrors(errors => {
          const errorsUpdated = { ...errors };
          delete errorsUpdated.firstName;
          return errorsUpdated;
        });
      }
    }

    if (form.lastName.trim() === '') {
      setErrors(errors => ({ ...errors, lastName: 'Last Name is required' }));
    } else {
      if (!nameRegex.test(form.lastName.trim())) {
        setErrors(errors => ({
          ...errors,
          lastName: 'Last Name is not valid',
        }));
      } else {
        setErrors(errors => {
          const errorsUpdated = { ...errors };
          delete errorsUpdated.lastName;
          return errorsUpdated;
        });
      }
    }

    if (form.age.trim() === '') {
      setErrors(errors => ({ ...errors, age: 'Age is required' }));
    } else {
      if (parseInt(form.age) < 20 || parseInt(form.age) > 70) {
        setErrors(errors => ({
          ...errors,
          age: 'Age should be between 20 and 70',
        }));
      } else {
        setErrors(errors => {
          const errorsUpdated = { ...errors };
          delete errorsUpdated.age;
          return errorsUpdated;
        });
      }
    }

    if (form.dateOfJoining.trim() === '') {
      setErrors(errors => ({
        ...errors,
        dateOfJoining: 'Date of Joining is required',
      }));
    } else {
      setErrors(errors => {
        const errorsUpdated = { ...errors };
        delete errorsUpdated.dateOfJoining;
        return errorsUpdated;
      });
    }

    if (form.title.trim() === '') {
      setErrors(errors => ({ ...errors, title: 'Title is required' }));
    } else {
      setErrors(errors => {
        const errorsUpdated = { ...errors };
        delete errorsUpdated.title;
        return errorsUpdated;
      });
    }

    if (form.department.trim() === '') {
      setErrors(errors => ({
        ...errors,
        department: 'Department is required',
      }));
    } else {
      setErrors(errors => {
        const errorsUpdated = { ...errors };
        delete errorsUpdated.department;
        return errorsUpdated;
      });
    }

    if (form.employeeType.trim() === '') {
      setErrors(errors => ({
        ...errors,
        employeeType: 'Employee Type is required',
      }));
    } else {
      setErrors(errors => {
        const errorsUpdated = { ...errors };
        delete errorsUpdated.employeeType;
        return errorsUpdated;
      });
    }
  };

  useEffect(() => {
    console.log('checking error', errors);
  }, [errors]);

  return (
    <div className={styles.formContainer}>
      <div className={errorClasses}>Please resolve the errors in the form</div>
      <form id='employeeForm' onSubmit={handleSubmit}>
        <legend className={styles.formLegend}>Add New Employee </legend>
        <fieldset className={styles.employeeForm}>
          <div class={styles.formGroup}>
            <input
              type='text'
              id='firstName'
              name='firstName'
              placeholder='First Name'
              onChange={handleChange}
            />
            <span className={styles.error}>{errors.firstName}</span>
          </div>
          <div class={styles.formGroup}>
            <input
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Last Name'
              onChange={handleChange}
            />
            <span className={styles.error}>{errors.lastName}</span>
          </div>
          <div class={styles.formGroup}>
            <input
              type='number'
              id='age'
              name='age'
              placeholder='Age'
              onChange={handleChange}
            />
            <span className={styles.error}>{errors.age}</span>
          </div>
          <div class={styles.formGroup}>
            <input
              type='date'
              id='dateOfJoining'
              name='dateOfJoining'
              placeholder='Date of Joining'
              onChange={handleChange}
            />
            <span className={styles.error}>{errors.dateOfJoining}</span>
          </div>
          <div class={styles.formGroup}>
            <select id='title' name='title' onChange={handleChange}>
              <option value='' disabled selected>
                Title
              </option>
              <option value='employee'>Employee</option>
              <option value='manager'>Manager</option>
              <option value='director'>Director</option>
              <option value='vp'>VP</option>
            </select>
            <span className={styles.error}>{errors.title}</span>
          </div>
          <div class={styles.formGroup}>
            <select id='department' name='department' onChange={handleChange}>
              <option value='' disabled selected>
                Department
              </option>
              <option value='it'>IT</option>
              <option value='marketing'>Marketing</option>
              <option value='hr'>HR</option>
              <option value='engineering'>Engineering</option>
            </select>
            <span className={styles.error}>{errors.department}</span>
          </div>
          <div class={styles.formGroup}>
            <select
              id='employeeType'
              name='employeeType'
              onChange={handleChange}
            >
              <option value='' disabled selected>
                Employee Type
              </option>
              <option value='fulltime'>Full-Time</option>
              <option value='parttime'>Part-Time</option>
              <option value='contract'>Contract</option>
              <option value='seasonal'>Seasonal</option>
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
