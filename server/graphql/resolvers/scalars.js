import { GraphQLScalarType, Kind } from 'graphql';

export const GQLDate = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    if (typeof value === 'string') {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  serialize(value) {
    return value.toISOString().slice(0, 10);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});
