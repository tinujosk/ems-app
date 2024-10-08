import {} from './models/db.js';
import { Employee } from './models/schema.js';

(async () => {
  const employees = [
    {
      firstName: 'Tinu',
      lastName: 'Jos',
      age: 31,
      doj: new Date('2024-01-01'),
      title: 'Employee',
      department: 'IT',
      employeeType: 'FullTime',
    },
    {
      firstName: 'Jos',
      lastName: 'Kadavanattu',
      age: 31,
      doj: new Date('2024-02-02'),
      title: 'Manager',
      department: 'Marketing',
      employeeType: 'PartTime',
    },
    {
      firstName: 'Mark',
      lastName: 'Zuckerberg',
      age: 31,
      doj: new Date('2023-11-01'),
      title: 'VP',
      department: 'Engineering',
      employeeType: 'FullTime',
    },
  ];

  await Employee.create(employees);
  process.exit();
})();
