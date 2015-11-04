"use strict";
/* @flow */

import Relay from "react-relay";

class DirectoryRoute extends Relay.Route {}
DirectoryRoute.queries = {
  file: () => Relay.QL`
    query {
      file(id: $fileID)
    }
  `,
};
DirectoryRoute.paramDefinitions = {
  fileID: {required: true},
};
DirectoryRoute.routeName = 'DirectoryRoute';

export default DirectoryRoute;
