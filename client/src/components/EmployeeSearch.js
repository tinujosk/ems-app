import React from 'react';
import '../App.css';

function EmployeeSearch() {
  return (
    <div className='searchContainer'>
      <input
        type='text'
        id='search'
        className='searchInput'
        placeholder='Start typing to search..'
      />
    </div>
  );
}

export default EmployeeSearch;
