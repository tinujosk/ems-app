import { } from '../../models/db.js';
import { Employee } from '../../models/schema.js';
import { GQLDate } from './scalars.js';

export const resolvers = {
  Query: {
    getEmployees: async () => await Employee.find({}),
    getOneEmployee: async (_, { id }) => await Employee.findById(id)
  },

  Mutation: {
    addEmployee: async (_, { employee }) => await Employee.create(employee),
    // editEmployee: async (_, { id, employee }) => await Employee.findOneAndUpdate({ id }, { ...employee }, { new: true }),
    // deleteEmployee: async (_, { id }) => await Issue.findOneAndDelete({ id }).id,
  },

  Date: GQLDate,
};
