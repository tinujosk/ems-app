import {} from '../../models/db.js';
import { Employee } from '../../models/schema.js';
import { GQLDate } from './scalars.js';

export const resolvers = {
  Query: {
    getEmployees: async () => await Employee.find({}),
  },

  Mutation: {
    addEmployee: async (_, { employee }) => await Employee.create(employee),
  },
  Date: GQLDate,
};
