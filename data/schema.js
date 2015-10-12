/* @flow */

var {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

var {
  nodeDefinitions,
  fromGlobalId
} = require('graphql-relay');

var FileType = new GraphQLObjectType({
  name: "File",
  description: "Represents a file in the FileSystem",
  fields: () => ({
    name: {
      type: GraphQLString,
      description: "The file's name in the FS",
      resolve: (file) => "TODO" // TODO
    }
  })
});

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    return "TODO"; // TODO
  },
  (obj) => {
    // TODO: give the possibility to support other types
    return FileType;
  }
);


var MobileSyncGraphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    description: "Read-Only access to the file system",
    fields: {
      node: nodeField,
      root: {
        type: FileType,
        description: "Gets the root element of the file system",
        resolve: () => "TODO" // TODO
      }
    }
  })
});

module.exports = MobileSyncGraphQLSchema;
