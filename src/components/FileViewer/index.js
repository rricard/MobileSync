'use strict';

import React, {
  View,
  Component,
  StyleSheet
} from "react-native";

import Relay from "react-relay";
import ImageViewer from "./ImageViewer.js"
import TextViewer from "./TextViewer.js"

const viewers = [
  {
    match: ({name}) => /(\.png|\.jpe?g|\.gif)$/i.test(name),
    component: ImageViewer
  },
  {
    match: () => true,
    component: TextViewer
  }
];


function matchViewerComponent(file) {
  return viewers.filter(({match}) => match(file))[0].component;
}

class FileViewer extends Component {
  render() {
    const {file} = this.props;
    const ViewerComponent = matchViewerComponent(file);
    return (<ViewerComponent {...file} />);
  }
}

export default Relay.createContainer(FileViewer, {
  fragments: {
    file: () => Relay.QL`
      fragment on File {
        url,
        lastModified
      }
    `
  }
});
