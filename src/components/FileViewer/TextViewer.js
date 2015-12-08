'use strict';

import React, {
  Component,
  Text
} from "react-native";

import {fetchWithCache} from "./../../lib/Cache.js";

export default class TextViewer extends Component {
  render() {
    const {text} = this.state;
    return (!!text ? <Text>{text}</Text> : <Text>Loading...</Text>);
  }

  constructor(props) {
    super(props);
    this.state = {
      text: null
    };
    fetchWithCache(this.props.url, this.props.lastModified).then(data => {
      this.setState({text: data});
      });
  }
}
