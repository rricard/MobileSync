/* @flow */
"use strict";

require("babel-register");

// Export the GraphQL Schema at launch
require("./export-schema.js");
var app = require('./app.js');

const PORT = process.env.PORT || 8000;
app.listen(PORT);
console.info("App available on http://localhost:" + PORT)
