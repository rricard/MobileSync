/* @flow */
'use strict';

import React, {
  Text,
  View,
  ListView,
  Component,
  StyleSheet
} from "react-native";

import Relay from "react-relay";

import FileItem from "./FileItem.js";

type FileListProps = {
  file: any,
  onSelect: (file: any) => void,
  onBack: () => void
};

const styles = StyleSheet.create({
  frame: {
    backgroundColor: "white",
    flexDirection: "column"
  },
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
  },
  list: {
    flex: 1
  }
});

class FileList extends Component {
  constructor(props: FileListProps) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.file.children.edges)
    };
  }

  render() {
    return (
      <View style={styles.frame}>
        <View style={styles.topBar}>
          {this.props.route ?
            <Text style={styles.backButton} onPress={this.props.onBack}>&lt;Back</Text> :
            null}
          <Text style={styles.title}>{this.props.file.name}</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => (
            <FileItem file={rowData.node}
                      onSelect={this.props.onSelect}/>
          )}
          style={styles.list} />
      </View>
    );
  }
}

export default Relay.createContainer(FileList, {
  fragments: {
    file: () => Relay.QL`
      fragment on File {
        id
        name

        children(first: 10) {
          edges {
            node {
              ${FileItem.getFragment('file')}
            }
          }
        }
      }
    `
  }
});
