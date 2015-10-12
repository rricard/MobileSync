"use strict";

var assert = require("assert");

var hello = require("../hello.js");

it("should square things up!", function() {
  assert.equal(hello.square(-2), 4);
  assert.equal(hello.square(-1), 1);
  assert.equal(hello.square(0), 0);
  assert.equal(hello.square(1), 1);
  assert.equal(hello.square(2), 4);
  assert.equal(hello.square(3), 9);
  assert.equal(hello.square(4), 16);
});
