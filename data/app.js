/* @flow */
"use strict";

import express from 'express';
import graphqlHTTP from 'express-graphql';

import MobileSyncGraphQLSchema from './schema.js';

let app = express();

app.use('/graphql', graphqlHTTP({
  schema: MobileSyncGraphQLSchema,
  graphiql: true
}));

export default app;
