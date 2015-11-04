/* @flow */
"use strict";

import bluebird from "bluebird";
import co from "co";
// Hack to make flow ignore errors related to the promisification
var fs:any = require("fs");
import path from "path";
import mime from "mime";
bluebird.promisifyAll(fs);

import {ROOT_NODE, FS_PATH} from "./config.js";

type File = {
  id: string,
  name: string,
  isDirectory: boolean,
  size?: number,
  mime?: string,
  url?: string
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
    url: `http://localhost:8000/fs${filePath}`
  };
}

export function getFile(id: string): Promise<File> {
  if(id === "/") {
    return Promise.resolve(ROOT_NODE);
  }
  return co(function*() {
    const stats = yield fs.statAsync(path.join(FS_PATH, id));
    return mapPathAndStatsToFile({filePath: id, stats});
  });
}

export function getChildrenIdsOfId(id: string): Promise<Array<string>> {
  return co(function*() {
    let filenames = [];
    try {
      filenames = yield fs.readdirAsync(path.join(FS_PATH, id));
    } catch(e) {
      if(!/ENOTDIR/.test(e.message)) {
        throw e;
      }
    }
    return (filenames || []).map(fn => path.join(id, fn));
  });
}
