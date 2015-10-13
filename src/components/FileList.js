/* @flow */
'use strict';

import {
  Component
} from "react";

import {
  Text,
  ListView
} from "react-native";

type FileListProps = {
  file: any
};

export default class FileList extends Component {
  constructor(props: FileListProps) {
    super(props);
    this.state = {
      dataSource: null
    };
  }

  componentWillReceiveProps(props: FileListProps) {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });
    this.setState({
      dataSource: ds.cloneWithRows(props.file.children.edges)
    });
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{JSON.stringify(rowData)}</Text>}
    />
    );
  }
}
