/* @flow */
'use strict';

import {
  Component,
  Navigator
} from "react-native";

import Relay from "react-relay";

import FileList from "./FileList.js";
import DirectoryRoute from "../routes/DirectoryRoute.js";
import RootRoute from "../routes/RootRoute.js";

export default class App extends Component {
  render() {
    return (
      <Navigator
        initialRoute={null}
        renderScene={(route, navigator) => (
          <Relay.RootContainer
            Component={FileList}
            route={route ? new DirectoryRoute(route) : new RootRoute()}/>
        )}/>
    );
  }
}
