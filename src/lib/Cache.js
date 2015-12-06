/* @flow */
'use strict';

import React,{
  AsyncStorage
} from "react-native";

export default function Cache() {};
Cache.fetch=(url)=> {
  return AsyncStorage.getItem(url).then(res=>{
  console.log(res);
  return res?
    res :
    Cache._fetchAndCache(url);
  });
};

Cache._fetchAndCache=( url)=> {
  const result= fetch(url)
  .then(res => res.text())
  .then(text => {
    console.log(url);
    AsyncStorage.setItem(url,text);
    return text;
  })
};

Cache.invalidate=(id)=>{
  id ? AsyncStorage.removeItem(id) : AsyncStorage.clear();
};
