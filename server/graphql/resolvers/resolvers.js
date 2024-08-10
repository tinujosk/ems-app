import {} from '../../models/db.js';
import { Employee } from '../../models/schema.js';
import { GQLDate } from './scalars.js';

export const resolvers = {
  Query: {
    getEmployees: async (_, { type }) =>
      await Employee.find(type ? { employeeType: type } : {}),
    getEmployee: async (_, { id }) => await Employee.findById(id),
    searchEmployees: async (_, { searchTerm }) => {
      const query = {};
    
      if (searchTerm) {
        // Split the searchTerm by space to differentiate firstName and lastName
        const terms = searchTerm.split(' ').filter(Boolean);
    
        if (terms.length === 1) {
          // If there's only one term, search in both firstName and lastName
          const term = new RegExp(terms[0], 'i');
          query.$or = [
            { firstName: term },
            { lastName: term }
          ];
        } else if (terms.length >= 2) {
          // If there are two or more terms, assume the first is firstName and the rest are lastName
          const firstName = new RegExp(terms[0], 'i');
          const lastName = new RegExp(terms.slice(1).join(' '), 'i');
          query.$or = [
            { firstName, lastName }
          ];
        }
      }
    
      return await Employee.find(query);
    },
    
    
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
