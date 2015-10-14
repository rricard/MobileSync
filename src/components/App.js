/* @flow */
'use strict';

import {
  Component
} from "react";

import {
  Navigator
} from "react-native";

import {
  RootContainer
} from "react-relay";

import FileList from "./FileList.js";
import DirectoryRoute from "../routes/DirectoryRoute.js";
import RootRoute from "../routes/RootRoute.js";

export default class App extends Component {
  render() {
    return (
      <Navigator
        initialRoute={null}
        renderScene={(route, navigator) => (
          <RootContainer
            Component={FileList}
            route={route ? new DirectoryRoute(route) : new RootRoute()}
            renderFetched={(data) => (
              <FileList navigator={navigator} {...data} />
            )}/>
        )}/>
    );
  }
}
