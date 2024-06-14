import {} from '../../models/db.js';
import { Employee } from '../../models/schema.js';
// import { GQLDate } from './scalars.js';

export const resolvers = {
  Query: {
    getEmployees: async () => {
      const Employees = await Employee.find({});
      return Employees;
    },
  },

  Mutation: {
    addEmployee: async (_, { employee }) => {
      console.log('REMOTE: Adding employee...', employee);

      // //Resolve id internally
      // if (employee.id < 0) {
      //   issue.id = (await Issue.getMaxId()) + 1;
      // }
      Employee.create(employee);
      return employee;
    },
  },
  // Date: GQLDate,
};
