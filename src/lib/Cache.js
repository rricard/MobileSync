/* @flow*/
'use strict';

import React,{
  AsyncStorage
} from "react-native";

type cacheObjet = {
  file: string,
  lastModified: string
}
/*Look for a URL in cache,
if not cached yet, or the fil in cache is out of date
call _fetchThenCache
*/
export function fetchWithCache(url: string, lastModified: string) {
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
function _fetchThenCache(url: string,lastModified: string) {
  return fetch(url)
  .then(res => res.text())
  .then(text => {
    const storedObject: cacheObjet= {
      file : text,
      lastModified : lastModified
    };
    AsyncStorage.setItem(url,JSON.stringify(storedObject));
    return text;
  });
};

export function invalidate(id?: string) {
  return id ?
  AsyncStorage.removeItem(id) :
  AsyncStorage.clear();
};
