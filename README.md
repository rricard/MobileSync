# MobileSync

[![Circle CI](https://circleci.com/gh/rricard/MobileSync/tree/master.svg?style=svg)](https://circleci.com/gh/rricard/MobileSync/tree/master)
[![Code Climate](https://codeclimate.com/github/rricard/MobileSync/badges/gpa.svg)](https://codeclimate.com/github/rricard/MobileSync)

React-Native application that uses GraphQL &amp; Relay to sync a filesystem

## Install

```
npm i -g react-native-cli
git clone git@github.com:rricard/MobileSync.git
cd MobileSync
npm i
```

## Run

```
npm start # production
npm run develop # development
```

And then, in an another terminal:

```
react-native run-android
```

Or you can build the project in XCode.

## Test & contribute

```
flow
npm test
npm run lint
```

Don't forget to check those before sending a PR. Note that flow checks failing
inside React Native are OK.

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
