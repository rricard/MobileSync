"use strict";
/* @flow */

import assert from "assert";

import {
  getFile,
  getChildrenIdsOfId
} from "../file-system.js";

describe("fileSystem", function() {
  describe("getFile", function() {
    it("should return the root", function*() {
      var root = yield getFile("/");
      if(!root) {
        throw new Error();
      }
      assert.equal(root.name, "Root");
    });

    it("should stat a file", function*() {
      var file = yield getFile("/test.md");
      if(!file) {
        throw new Error();
      }
      assert.equal(file.name, "test.md");
      assert.equal(file.isDirectory, false);
      assert.equal(file.mime, "text/x-markdown");
      assert.equal(file.size, 66);
    });

    it("should stat a dir", function*() {
      var dir = yield getFile("/src/tests");
      if(!dir) {
        throw new Error();
      }
      assert.equal(dir.name, "tests");
      assert.equal(dir.isDirectory, true);
    });
  });

  describe("getChildrenIdsOfId", function() {
    it("should list the root", function*() {
      var dirls = yield getChildrenIdsOfId("/");
      if(!dirls) {
        throw new Error();
      }
      assert.equal(dirls.length, 3);
      assert(dirls.indexOf("/images") > -1);
      assert(dirls.indexOf("/test.md") > -1);
    });

    it("should list subfolders", function*() {
      var dirls = yield getChildrenIdsOfId("/src");
      if(!dirls) {
        throw new Error();
      }
      assert.equal(dirls.length, 2);
      assert(dirls.indexOf("/src/hello.js") > -1);
      assert(dirls.indexOf("/src/tests") > -1);
    });

    it("should list files as empty", function*() {
      var dirls = yield getChildrenIdsOfId("/test.md");
      if(!dirls) {
        throw new Error();
      }
      assert.equal(dirls.length, 0);
    });
  });
});
