"use strict";

import path from "path";

export const FS_PATH = path.join(
  __dirname,
  "..",
  process.env.FS_PATH || "./data/example"
);
export const ROOT_NODE: File = {
  id: "/",
  name: "Root",
  isDirectory: true,
  lastModified: new Date(0)
};
