import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLScalarType, Kind } from 'graphql';
import { Employee } from './models/schema';

const app = express();

const typeDefs = `type Query`;

const resolvers = app.listen(process.env.PORT || 3000, () => {});
