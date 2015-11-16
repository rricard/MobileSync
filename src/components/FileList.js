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
import TopBar from "./TopBar.js";

type FileListProps = {
  file: any,
  onSelect: (file: any) => void,
  onBack: () => void
};

const styles = StyleSheet.create({
  frame: {
    backgroundColor: "white",
    flexDirection: "column",
    flex: 1
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
    const {onSelect} = this.props;
    return (
      <ListView dataSource={this.state.dataSource}
                renderRow={(rowData) => (
                  <FileItem file={rowData.node}
                            onSelect={onSelect}/>
                )}
                style={styles.list} />
    );
  }
}

export default Relay.createContainer(FileList, {
  fragments: {
    file: () => Relay.QL`
      fragment on File {
        id
        ${TopBar.getFragment('file')}

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
