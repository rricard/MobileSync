'use strict';

import React, {
  Component,
  Text
} from "react-native";

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

    fetch(this.props.url).then(res => res.text()).then(data => {
      this.setState({text: data});
    });
  }
}
