"use strict";
/* @flow */

var assert = require("assert");

var fileSystem = require("../file-system.js");

describe("fileSystem", function() {
  describe("getFile", function() {
    it("should return the root", function*() {
      var root = yield fileSystem.getFile("/");
      if(!root) {
        throw new Error();
      }
      assert.equal(root.name, "Root");
    });

    it("should stat a file", function*() {
      var file = yield fileSystem.getFile("/test.md");
      if(!file) {
        throw new Error();
      }
      assert.equal(file.name, "test.md");
      assert.equal(file.isDirectory, false);
      assert.equal(file.mime, "text/x-markdown");
      assert.equal(file.size, 66);
    });

    it("should stat a dir", function*() {
      var dir = yield fileSystem.getFile("/src/__tests__");
      if(!dir) {
        throw new Error();
      }
      assert.equal(dir.name, "__tests__");
      assert.equal(dir.isDirectory, true);
    });
  });

  describe("getChildrenIdsOfId", function() {
    it("should list the root", function*() {
      var dirls = yield fileSystem.getChildrenIdsOfId("/");
      if(!dirls) {
        throw new Error();
      }
      assert.equal(dirls.length, 3);
      assert(dirls.indexOf("/images") > -1);
      assert(dirls.indexOf("/test.md") > -1);
    });

    it("should list subfolders", function*() {
      var dirls = yield fileSystem.getChildrenIdsOfId("/src");
      if(!dirls) {
        throw new Error();
      }
      assert.equal(dirls.length, 2);
      assert(dirls.indexOf("/src/hello.js") > -1);
      assert(dirls.indexOf("/src/__tests__") > -1);
    });
  });
});
