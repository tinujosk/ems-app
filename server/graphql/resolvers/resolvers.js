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
  // Mutation: {
  //   addIssue: async (_, { issue }) => {
  //     console.log('REMOTE: Adding issue...', issue);

  //     //Resolve id internally
  //     if (issue.id < 0) {
  //       issue.id = (await Issue.getMaxId()) + 1;
  //     }
  //     Issue.create(issue);
  //     return issue;
  //   },
  //   editIssue: async (_, { issue }) => {
  //     const id = issue.id;
  //     delete issue.id;

  //     issue = await Issue.findOneAndUpdate({ id }, { ...issue }, { new: true });
  //     console.log('REMOTE: Editing issue...', issue);
  //     return issue;
  //   },
  //   deleteIssue: async (_, { id }) => {
  //     console.log('REMOTE: Deleting issue...', id);
  //     const issue = await Issue.findOneAndDelete({ id });
  //     return issue;
  //   },
  // },
  // Date: GQLDate,
};
