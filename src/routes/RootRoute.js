"use strict";
/* @flow */

import Relay from "react-relay";

class RootRoute extends Relay.Route {}
RootRoute.queries = {
  file: () => Relay.QL`
    query {
      root
    }
  `,
};
RootRoute.routeName = 'RootRoute';

export default RootRoute;
