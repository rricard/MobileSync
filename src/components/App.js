/* @flow */
'use strict';

import React, {
  Component,
  Navigator,
  StyleSheet
} from "react-native";

import Relay from "react-relay";

import Dispatcher from "./Dispatcher.js";
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
        renderScene={(navigatorRoute, navigator) =>
          <Relay.RootContainer
            Component={Dispatcher}
            route={navigatorRoute ?
              new DirectoryRoute({fileID: navigatorRoute}) :
              new RootRoute()}
            renderFetched={(graphqlResolutionData) =>
              <Dispatcher route={navigatorRoute}
                          onBack={() => navigator.pop()}
                          onSelect={({id: newNavigatorRoute}) =>
                            navigator.push(newNavigatorRoute)}
                          {...graphqlResolutionData} />
            }/>
        }/>
    );
  }
}
