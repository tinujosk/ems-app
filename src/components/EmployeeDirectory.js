import React from 'react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeCreate from './EmployeeCreate';
import EmployeeTable from './EmployeeTable';
import styles from './EmployeeDirectory.module.css';

function EmployeeDirectory() {
  return (
    <div className={styles.container}>
      <div className={styles.appHeader}>
        <h1 className={styles.appTitle}>Employee Management System</h1>
      </div>
      <div className={styles.subContainer}>
        <EmployeeSearch />
        <EmployeeTable />
        <EmployeeCreate />
      </div>
    </div>
  );
}

export default EmployeeDirectory;
