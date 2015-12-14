/* @flow */
'use strict';

import React, {
  Component,
  Navigator,
  StyleSheet,
  NativeModules
} from "react-native";

import Relay from "react-relay";

import Dispatcher from "./Dispatcher.js";
import DirectoryRoute from "../routes/DirectoryRoute.js";
import RootRoute from "../routes/RootRoute.js";

const NetworkAndroid=module.exports=NativeModules.NetworkAndroid;

const styles = StyleSheet.create({
  frame: {
    marginTop: 20
  },
});

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={isOnWifi : false}
    setInterval(() => {
      NetworkAndroid.isWifiOn((res)=>{
        this.state={isOnWifi : res};
      });
    });
    10000
  }

  render() {
    const {isOnWifi} = this.state;
    return (
      <Navigator
        initialRoute={null}
        renderScene={(navigatorRoute, navigator) =>
          <Relay.RootContainer
            Component={Dispatcher}
            route={navigatorRoute ?
              new DirectoryRoute({fileID: navigatorRoute}) :
              new RootRoute()}
            forceFetch={isOnWifi}
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
