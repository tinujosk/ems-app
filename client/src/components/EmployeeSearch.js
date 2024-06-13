import React from 'react';
import styles from './EmployeeSearch.module.css';

function EmployeeSearch() {
  return (
    <div class={styles.searchContainer}>
      <input
        type='text'
        id='search'
        class={styles.searchInput}
        placeholder='Start typing to search..'
      />
    </div>
  );
}

export default EmployeeSearch;
