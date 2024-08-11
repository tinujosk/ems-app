import {} from '../../models/db.js';
import { Employee } from '../../models/schema.js';
import { GQLDate } from './scalars.js';


export const resolvers = {
  Query: {
    getEmployees: async (_, { type, searchTerm }) => {
      const query = {};

      if (type) {
        query.employeeType = type;
      }

      if (searchTerm) {
        const terms = searchTerm.split(' ').filter(Boolean);

        if (terms.length === 1) {
          const term = new RegExp(terms[0], 'i');
          query.$or = [{ firstName: term }, { lastName: term }];
        } else if (terms.length >= 2) {
          const firstName = new RegExp(terms[0], 'i');
          const lastName = new RegExp(terms.slice(1).join(' '), 'i');
          query.$and = [{ firstName }, { lastName }];
        }
      }

      return await Employee.find(query);
    },
    getEmployee: async (_, { id }) => await Employee.findById(id),
  },

  Mutation: {
    addEmployee: async (_, { employee }) => await Employee.create(employee),
    editEmployee: async (_, { id, employee }) =>
      await Employee.findOneAndUpdate({ _id: id }, { ...employee }, { new: true }),
    deleteEmployee: async (_, { id }) => {
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      return deletedEmployee._id;
    },
  },

  Date: GQLDate,
};