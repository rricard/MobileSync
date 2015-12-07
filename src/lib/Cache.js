/* @flow */
'use strict';

import React,{
  AsyncStorage
} from "react-native";


export function fetchWithCache(url) {
  return AsyncStorage.getItem(url).then(res=>{
    return res?
      res :
      _fetchThenCache(url);
  });
};

function _fetchThenCache(url) {
  const result = fetch(url)
  .then(res => res.text())
  .then(text => {
    AsyncStorage.setItem(url,text);
    return text;
  });
};

export function invalidate(id?: string) {
  return id ?
  AsyncStorage.removeItem(id) :
  AsyncStorage.clear();
};
