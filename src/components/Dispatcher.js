/* @flow */
'use strict';

import React, {
  View,
  Text,
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
        {this.props.file.isDirectory ?
          <FileList {...this.props} /> :
          <Text>Not a directory</Text>}
      </View>
    )
  }
}

export default Relay.createContainer(Dispatcher, {
  fragments: {
    file: () => Relay.QL`
      fragment on File {
        isDirectory,
        ${TopBar.getFragment('file')}
        ${FileList.getFragment('file')}
      }
    `
  }
});
