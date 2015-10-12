# MobileSync

[![Circle CI](https://circleci.com/gh/rricard/MobileSync/tree/master.svg?style=svg)](https://circleci.com/gh/rricard/MobileSync/tree/master)
[![Code Climate](https://codeclimate.com/github/rricard/MobileSync/badges/gpa.svg)](https://codeclimate.com/github/rricard/MobileSync)

React-Native application that uses GraphQL &amp; Relay to sync a filesystem

## Architecture

MobileSync is broke down in two dependent parts: the GraphQL file server and the
React/Relay client.

### Underlying FileSystem Model

Here is the most flexible filesystem authorization system we could create:

![FileSystem Model](./models/filesystem.png)

In our situation though, we'll not implement it completely.

### GraphQL Schema / Interface

GraphQL will expose a few types to query the filesystem.

![GraphQL Schema](./models/schema.png)
