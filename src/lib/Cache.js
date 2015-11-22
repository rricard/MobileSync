/* @flow */
'use strict';

export default class Cache {
  cache: {[key: string]: string};

  constructor() {
    this.cache = {};
  }

  fetch(id: string, url: string): Promise<string> {
    return this.cache[id] ?
      Promise.resolve(this.cache[id]) :
      this._fetchAndCache(id,url);
  }

  _fetchAndCache(id: string, url: string): Promise<string> {
    return fetch(url)
    .then(res => res.text())
    .then(text => {
      this.cache[id] = text;
      return text;
    });
  }

  invalidate(id: ?string): void{
    id ? delete this.cache[id] : this.cache={};
  }
}
