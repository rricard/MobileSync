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
import FileViewer from "./FileViewer"

var styles = StyleSheet.create({
  centralContainer: {
    flex: 1,
  }
});

class Dispatcher extends Component {
  render() {
    return(
      <View style={styles.viewerContainer}>
        <TopBar {...this.props} />
        <View style={styles.centralContainer}>
          {this.props.file.isDirectory ?
            <FileList {...this.props} /> :
            <FileViewer {...this.props} />}
        </View>
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
        ${FileViewer.getFragment('file')}
      }
    `
  }
});
