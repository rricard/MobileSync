/* @flow */
'use strict';

import Relay from "react-relay";

export default function initRelayNetworking() {
  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('http://localhost:8000/graphql')
  );
}
