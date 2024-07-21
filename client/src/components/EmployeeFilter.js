import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export default function EmployeeFilter() {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const type = searchParams.get('Type');

  return (
    <div>
      <Link to={{ pathname: '/employees', search: '?Type=FullTime' }}>
        FullTime Employees
      </Link>
      <Link to='/employees'>Reset Filter</Link>

      <select
        name='type'
        value={type || 'FullTime'}
        onChange={e => {
          navigate(`/employees?Type=${e.target.value}`);
        }}
      >
        <option value='FullTime'>FullTime</option>
        <option value='PartTime'>PartTime</option>
        <option value='Contract'>Contract</option>
        <option value='Seasonal'>Seasonal</option>
      </select>
    </div>
  );
}
