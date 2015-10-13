/* @flow */
"use strict";

var assert = require("assert");

var {graphql} = require("graphql");
var schema = require("../schema");

describe("GraphQL schema", function() {
  it("should let us do a complex read query", function*() {
    var gqlResult = yield graphql(schema, `
      fragment FileInfo on File {
        id
        name
        isDirectory
        size
        mime
        url
      }

      fragment FileChildren on File {
        children(last: 1) {
          edges {
            node {
              ...FileInfo
            }
          }
        }
      }

      query Explore($ID: ID!) {
        rootDir: root {
          ...FileInfo
          ...FileChildren
        }
        imagesDir: file(id: $ID) {
          ...FileInfo
          ...FileChildren
        }
      }
    `, {}, {
      "ID": "RmlsZTovaW1hZ2Vz"
    });
    if(!gqlResult) {
      throw new Error("Undefined GraphQL results");
    }
    if(gqlResult.errors) {
      throw gqlResult.errors;
    }
    if(!gqlResult.data) {
      throw new Error("Undefined GraphQL data");
    }
    const rdir = gqlResult.data.rootDir;
    if(!rdir ||
      !rdir.children ||
      !rdir.children.edges ||
      !rdir.children.edges[0] ||
      !rdir.children.edges[0].node) {
      throw new Error("No root data");
    }
    const idir = gqlResult.data.imagesDir;
    if(!idir ||
      !idir.children ||
      !idir.children.edges ||
      !idir.children.edges[0] ||
      !idir.children.edges[0].node) {
      throw new Error("No image data");
    }

    assert(rdir.id !== "/");
    assert.equal(rdir.name, "Root");
    assert.equal(rdir.isDirectory, true);
    assert.equal(rdir.children.edges.length, 1);
    assert.equal(rdir.children.edges[0].node.name, "test.md");
    assert.equal(rdir.children.edges[0].node.mime, "text/x-markdown");
    assert.equal(rdir.children.edges[0].node.size, 66);

    assert(idir.id !== "/images");
    assert.equal(idir.name, "images");
    assert.equal(idir.isDirectory, true);
    assert.equal(idir.children.edges.length, 1);
    assert.equal(idir.children.edges[0].node.name, "insa.png");
    assert.equal(idir.children.edges[0].node.mime, "image/png");
    assert.equal(idir.children.edges[0].node.size, 16328);
  });
});
