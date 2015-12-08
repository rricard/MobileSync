/* @flow */
"use strict";

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLDate,
  GraphQLID
} from 'graphql';

import {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray
} from 'graphql-relay';

import {
  getFile,
  getChildrenIdsOfId
} from './file-system.js';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    if(type === "File") {
      return getFile(id);
    }
    return null;
  },
  (obj) => {
    if(obj.id && obj.name && obj.isDirectory) {
      return FileType;
    }
    return null;
  }
);

const FileType = new GraphQLObjectType({
  name: "File",
  description: "Represents a file in the FileSystem",
  fields: () => ({
    id: globalIdField("File"),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The file's name in the FS",
      resolve: (file) => file.name
    },
    isDirectory: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "Defines if the file descriptor is in fact a directory",
      resolve: (file) => file.isDirectory
    },
    lastModified: {
        type: GraphQLString,
        description: "Defines the time the file/directory was modified for the last time",
        resolve: (file) => file.lastModified.toISOString()
    },
    size: {
      type: GraphQLInt,
      description: "Defines the size (in bytes) of a given file",
      resolve: (file) => file.size
    },
    mime: {
      type: GraphQLString,
      description: "Defines the kind of file descriptor via a MIME type",
      resolve: (file) => file.mime
    },
    url: {
      type: GraphQLString,
      description: "Defines the url of the file in order to fetch it via HTTP",
      resolve: (file) => file.url
    },
    children: {
      type: FileConnection,
      description: `If the file descriptor is a directory, gets its children.
                    It will be empty otherwise.`,
      args: connectionArgs,
      resolve: (dir, args) => connectionFromPromisedArray(
        getChildrenIdsOfId(dir.id)
        .then(ids => Promise.all(ids.map(id => getFile(id)))),
        args
      )
    }
  }),
  interfaces: [nodeInterface]
});

const {connectionType: FileConnection} =
  connectionDefinitions({name: 'File', nodeType: FileType});

const MobileSyncGraphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    description: "Read-Only access to the file system",
    fields: {
      node: nodeField,
      root: {
        type: FileType,
        description: "Gets the root element of the file system",
        resolve: (root) => getFile("/")
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
        resolve: (root, {id}) => getFile(fromGlobalId(id).id)
      }
    }
  })
});

export default MobileSyncGraphQLSchema;
