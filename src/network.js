/* @flow */
'use strict';

import Relay from "react-relay";

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:8000/graphql')
);
