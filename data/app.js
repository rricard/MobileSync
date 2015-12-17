/* @flow */
"use strict";

import graphqlHTTP from 'express-graphql';
import serveStatic from 'serve-static';

import MobileSyncGraphQLSchema from './schema.js';
import {ROOT_NODE, FS_PATH} from "./config.js";

var express=require("express");
var app = express();

app.use('/graphql', graphqlHTTP({
  schema: MobileSyncGraphQLSchema,
  graphiql: true
}));

app.use('/fs', serveStatic(FS_PATH));

module.exports= app;
