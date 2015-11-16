/* @flow */
'use strict';

import React, {
  View,
  Component,
  StyleSheet
} from "react-native";

import Relay from "react-relay";

import TopBar from "./TopBar.js";
import FileList from "./FileList.js";

class Dispatcher extends Component {
  render() {
    return(
      <View>
        <TopBar {...this.props} />
        <FileList {...this.props} />
      </View>
    )
  }
}

export default Relay.createContainer(Dispatcher, {
  fragments: {
    file: () => Relay.QL`
      fragment on File {
        ${TopBar.getFragment('file')}
        ${FileList.getFragment('file')}
      }
    `
  }
});
