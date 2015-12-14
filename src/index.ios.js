/* @flow */
'use strict';

import {
  AppRegistry
} from 'react-native';

import initRelayNetworking from "./network.js";
import App from './components/App.js';

initRelayNetworking();
AppRegistry.registerComponent('MobileSync', () => App);
