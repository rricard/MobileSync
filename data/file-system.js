/* @flow */
"use strict";

var bluebird = require("bluebird");
var co = require("co");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
bluebird.promisifyAll(fs);

type File = {
  id: string,
  name: string,
  isDirectory: boolean,
  size?: number,
  mime?: string,
  url?: string
};

const FS_PATH = path.join(
  __dirname,
  "..",
  process.env.FS_PATH || "./data/example"
);

const ROOT_NODE: File = {
  id: "/",
  name: "Root",
  isDirectory: true
};

function mapPathAndStatsToFile(
  {filePath, stats}: {filePath: string, stats: any}
): File {
  const name = path.parse(filePath).base;
  return stats.isDirectory() ? {
    id: filePath,
    name: name,
    isDirectory: true
  } : {
    id: filePath,
    name: name,
    isDirectory: false,
    size: stats.size,
    mime: mime.lookup(filePath),
    url: "TODO"
  };
}

function getFile(id: string): Promise<File> {
  if(id === "/") {
    return Promise.resolve(ROOT_NODE);
  }
  return co(function*() {
    const stats = yield fs.statAsync(path.join(FS_PATH, id));
    return mapPathAndStatsToFile({filePath: id, stats});
  });
}

function getChildrenIdsOfId(id: string): Promise<Array<string>> {
  return co(function*() {
    const filenames = yield fs.readdirAsync(path.join(FS_PATH, id));
    return (filenames || []).map(fn => path.join(id, fn));
  });
}

exports.getFile = getFile;
exports.getChildrenIdsOfId = getChildrenIdsOfId;
