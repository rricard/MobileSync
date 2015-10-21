/* @flow */
'use strict';

import React, {
  Text,
  ListView,
  Component
} from "react-native";

import Relay from "react-relay";

import FileItem from "./FileItem.js";

type FileListProps = {
  file: any
};

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
    return this.state && this.state.dataSource ?
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => {
          return <FileItem file={rowData.node}/>
        }} /> :
      <Text>Loading...</Text>;
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
