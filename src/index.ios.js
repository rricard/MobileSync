/* @flow */
'use strict';

var React = require('react-native');
var {
  AppRegistry
} = React;

var App = require('./components/App.js');

AppRegistry.registerComponent('MobileSync', () => App);
