/* @flow */

var express = require('express');
var graphqlHTTP = require('express-graphql');

var MobileSyncGraphQLSchema = require('./schema.js');

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: MobileSyncGraphQLSchema,
  graphiql: true
}));

module.exports = app;
