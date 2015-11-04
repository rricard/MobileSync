/* @flow */
'use strict';

import React, {
  Component,
  Navigator,
  StyleSheet
} from "react-native";

import Relay from "react-relay";

import FileList from "./FileList.js";
import DirectoryRoute from "../routes/DirectoryRoute.js";
import RootRoute from "../routes/RootRoute.js";

const styles = StyleSheet.create({
  frame: {
    marginTop: 20
  },
});

export default class App extends Component {
  render() {
    return (
      <Navigator
        initialRoute={null}
        renderScene={(route, navigator) => {
          return <Relay.RootContainer
            Component={FileList}
            route={route ? new DirectoryRoute({fileID: route}) : new RootRoute()}
            renderFetched={(data) => (
              <FileList route={route}
                        onBack={() => navigator.pop()}
                        onSelect={({id}) => navigator.push(id)}
                        {...data} />
            )}/>
        }} />
    );
  }
}
