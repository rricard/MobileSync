/* @flow */
'use strict';

import React, {
  Text,
  View,
  Component,
  StyleSheet
} from "react-native";

import Relay from "react-relay";

const styles = StyleSheet.create({
  topBar: {
    paddingTop: 20,
    height: 60,
    backgroundColor: "rgb(250,250,250)",
    flexDirection: "row"
  },
  backButton: {
    fontSize: 20,
    color: "rgb(10,100,250)",
    alignSelf: "center"
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
    flex: 1,
    textAlign: "center"
  }
});

class TopBar extends Component {
  render() {
    const {route, onBack, file} = this.props;
    return (
      <View style={styles.topBar}>
        {route ?
          <Text style={styles.backButton} onPress={onBack}>&lt;Back</Text> :
          null}
        <Text style={styles.title}>{file.name}</Text>
      </View>
    );
  }
}

export default Relay.createContainer(TopBar, {
  fragments: {
    file: () => Relay.QL`
      fragment on File {
        name
      }
    `
  }
});
