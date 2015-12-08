/* @flow weak */
'use strict';

import React,{
  AsyncStorage
} from "react-native";

/*Look for a URL in cache,
if not cached yet, or the fil in cache is out of date
call _fetchThenCache
*/
export function fetchWithCache(url, lastModified) {
  return AsyncStorage.getItem(url).then(res=>{
    const result=JSON.parse(res);
    return (!res || new Date(result.lastModified) < new Date(lastModified)) ?
      _fetchThenCache(url,lastModified):
      result.file;
  });
};

/* Fetch a file from an url then
  cache this file with his lastModified date.
*/
function _fetchThenCache(url,lastModified) {
  return fetch(url)
  .then(res => res.text())
  .then(text => {
    const cacheObject = {
      file : text,
      lastModified : lastModified
    };
    AsyncStorage.setItem(url,JSON.stringify(cacheObject));
    return text;
  });
};

export function invalidate(id?: string) {
  return id ?
  AsyncStorage.removeItem(id) :
  AsyncStorage.clear();
};
