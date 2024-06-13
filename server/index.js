import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';
import { Employee } from './models/schema';

const app = express();

const typeDefs = `

    scalar Date

    enum Title {
        Employee
        Manager
        Director
        VP
    }

    enum Department {
        IT
        Marketing
        HR
        Engineering
    }

    enum EmployeeType {
        Fulltime
        Parttime
        Contract
        Seasonal
    }

    type Issue {
        id:Int! ,
        status: Status!,
        owner: String!,
        effort: Int!,
        created: Date!,
        due: Date!,
        title: String,
    }

    input InputIssue {
        id:Int! ,
        status: Status,
        owner: String,
        effort: Int,
        created: Date,
        due: Date,
        title: String,
    }

    type Query {
      getIssues: [Issue!]!
    }

    type Mutation {
      addIssue(issue:InputIssue!):Issue!
      editIssue(issue:InputIssue!):Issue
      deleteIssue(id:Int!):Issue
    }


`;

const resolvers = app.listen(process.env.PORT || 3000, () => {});
