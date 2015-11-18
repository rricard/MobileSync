'use strict';

import React, {
  Component,
  Image,
  StyleSheet
} from "react-native";

var styles = StyleSheet.create({
  image: {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  },
});


export default class ImageViewer extends Component {
  render() {
    const {url} = this.props;
    return (<Image resizeMode='contain' style={styles.image} source={{uri:url}}/>);
  }
}
