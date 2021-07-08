const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Query {
    "A list field that could use some performance improvements"
    allUsers: [User!]!
    topics: [String!]
  }
  
  type User {
    firstName: String
    lastName: String
    topics: [String]
    username: String
  }
`;
const allUsers = [
    {
        firstName: 'Elizabeth',
        lastName: 'Durf',
        topics: ['pizza', 'react', 'pets', 'nature', 'hot chip'],
        username:'eadurflinger',
    },
    {
        firstName: 'Mew',
        lastName: 'Durf',
        topics: ['hay', 'react', 'carrots', 'zoomies'],
        username:'eadurflinger',
    },
  ];
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        topics: () => ['pizza', 'hot chip', 'carrots', 'pets', 'nature', 'zoomies', 'react', 'hay'],
        allUsers: (parent, { page } = {}) => allUsers,
    },
  };
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
    