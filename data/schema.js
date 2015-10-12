/* @flow */

var {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID
} = require('graphql');

var {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray
} = require('graphql-relay');

var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    return {id: id}; // TODO
  },
  (obj) => {
    // TODO: give the possibility to support other types
    return FileType;
  }
);

var FileType = new GraphQLObjectType({
  name: "File",
  description: "Represents a file in the FileSystem",
  fields: () => ({
    id: globalIdField("File"),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The file's name in the FS",
      resolve: (file) => "TODO" // TODO
    },
    isDirectory: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "Defines if the file descriptor is in fact a directory",
      resolve: (file) => false // TODO
    },
    size: {
      type: GraphQLInt,
      description: "Defines the size (in bytes) of a given file",
      resolve: (file) => 0 // TODO
    },
    mime: {
      type: GraphQLString,
      description: "Defines the kind of file descriptor via a MIME type",
      resolve: (file) => "text/plain" // TODO
    },
    url: {
      type: GraphQLString,
      description: "Defines the url of the file in order to fetch it via HTTP",
      resolve: (file) => "http://example.com" // TODO
    },
    children: {
      type: FileConnection,
      description: `If the file descriptor is a directory, gets its children.
                    It will be empty otherwise.`,
      args: connectionArgs,
      resolve: (dir, args) => connectionFromArray(
        [], // TODO
        args
      )
    }
  }),
  interfaces: [nodeInterface]
});

var {connectionType: FileConnection} =
  connectionDefinitions({name: 'File', nodeType: FileType});

var MobileSyncGraphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    description: "Read-Only access to the file system",
    fields: {
      node: nodeField,
      root: {
        type: FileType,
        description: "Gets the root element of the file system",
        resolve: (root) => ({id: "/"}) // TODO
      },
      file: {
        type: FileType,
        description: "Gets a precise file from the file system",
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
            description: "The file's id to fetch"
          }
        },
        resolve: (root, {id}) => ({id: id}) // TODO
      }
    }
  })
});

module.exports = MobileSyncGraphQLSchema;
