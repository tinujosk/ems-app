import {} from '../../models/db.js';
import { Employee } from '../../models/schema.js';
import { GQLDate } from './scalars.js';

export const resolvers = {
  Query: {
    getEmployees: async (_, { type }) =>
      await Employee.find(type ? { employeeType: type } : {}),
    getEmployee: async (_, { id }) => await Employee.findById(id),
  },

  Mutation: {
    addEmployee: async (_, { employee }) => await Employee.create(employee),
    editEmployee: async (_, { id, employee }) =>
      await Employee.findOneAndUpdate(
        { _id: id },
        { ...employee },
        { new: true }
      ),
    deleteEmployee: async (_, { id }) => {
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      return deletedEmployee._id;
    },
  },

  Date: GQLDate,
};
