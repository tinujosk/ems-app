import React from 'react';
import styles from './EmployeeSearch.module.css';

function EmployeeSearch() {
  return (
    <div className={styles.searchContainer}>
      <input
        type='text'
        id='search'
        className={styles.searchInput}
        placeholder='Start typing to search..'
      />
    </div>
  );
}

export default EmployeeSearch;
