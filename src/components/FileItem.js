/* @flow */
'use strict';

import React, {
  View,
  Text,
  ListView,
  Component
} from "react-native";

import Relay from "react-relay";

class FileItem extends Component {
  render(): Component {
    const {file} = this.props;
    return (
      <View>
        <Text>{file.name}</Text>
      </View>
    );
  }
}

export default Relay.createContainer(FileItem, {
  fragments: {
    file: () => Relay.QL`
      fragment on File {
        id
        name
      }
    `
  }
});;
