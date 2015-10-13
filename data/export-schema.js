"use strict";
/* @flow */

import fs from 'fs';
import path from 'path';
import Schema from './schema.js';
import { graphql }  from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

// Save JSON of full schema introspection for Babel Relay Plugin to use
graphql(Schema, introspectionQuery).then(result => {
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, './schema.json'),
      JSON.stringify(result, null, 2)
    );
  }
});
