import assert from "assert";

global.fetch = (url) => Promise.resolve({
  text: () => Promise.resolve(url)
});

const Cache = require("../Cache.js");

describe('Cache', function() {
  beforeEach(function() {
    this.cache = new Cache();
  });

  describe('cacheFetch', function() {
    it('should fetch the url properly for the first time', function*() {
      const res = yield this.cache.fetch("ID","URL1");
      assert.equal(res,"URL1");
    });

    it('should fetch the first url properly for the second time', function*() {
      yield this.cache.fetch("ID","URL1")
      const res = yield this.cache.fetch("ID","URL2")
      assert.equal(res,"URL1");
    });

    it('should fetch the second url after the cache was invalidate',function*(){
      yield this.cache.fetch("ID","URL1");
      this.cache.invalidate();
      const res = yield this.cache.fetch("ID","URL2");
      assert.equal(res,"URL2");
    });

    it('should invalidate a specific id',function*(){
      yield this.cache.fetch("ID","URL1");
      this.cache.invalidate("ID");
      const res = yield this.cache.fetch("ID","URL2");
      assert.equal(res,"URL2");
    });

    it('should not invalidate all the cache when invalidate was called with a specific id',function*(){

      yield this.cache.fetch("ID1","URL1");
      yield this.cache.fetch("ID2","URL2");
      this.cache.invalidate("ID1");
      const res = yield this.cache.fetch("ID2","URL4");
      assert.equal(res,"URL2");
    });
});
});
