/* @flow */
'use strict';

import React, {
  View,
  Text,
  ListView,
  Component,
  StyleSheet
} from "react-native";

import Relay from "react-relay";

const styles = StyleSheet.create({
  cell: {
    margin: 10,
    flexDirection: "row"
  },
  icon: {
    color: "grey"
  },
  title: {
    fontSize: 16
  }
});

class FileItem extends Component {
  render(): Component {
    const {file, onSelect} = this.props;
    return (
      <Text style={styles.cell} onPress={() => onSelect(file)}>
      <Text style={styles.icon}>{file.isDirectory ? "DIR " : null}</Text>
      <Text style={styles.title}>{file.name}</Text>
      </Text>
    );
  }
}

export default Relay.createContainer(FileItem, {
  fragments: {
    file: () => Relay.QL`
      fragment on File {
        id
        name
        isDirectory
      }
    `
  }
});;
