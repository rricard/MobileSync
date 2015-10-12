/* @flow */

var {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

var MobileSyncGraphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return Promise.resolve('world');
        }
      }
    }
  })
});

module.exports = MobileSyncGraphQLSchema;
