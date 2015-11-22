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
    it('should fetch the url properly for the first time', function(done) {
      this.cache.fetch("ID","URL1")
      .then(res=> {
        setTimeout(()=> {
          assert.equal(res,"URL1");
          done();
        });
      });
    });

    it('should fetch the first url properly for the second time', function(done) {
      this.cache.fetch("ID","URL1")
      .then(() => this.cache.fetch("ID","URL2"))
      .then(text => {
        setTimeout(()=> {
          assert.equal(text,"URL1");
          done();
        });
      })
    });

    it('should fetch the second url after the cache was invalidate',function(done){
      this.cache.fetch("ID","URL1")
      .then(() => this.cache.invalidate())
      .then(() => this.cache.fetch("ID","URL2"))
      .then(text => {
        setTimeout(()=> {
          assert.equal(text,"URL2");
          done();
        });
      });
    });

    it('should invalidate a specific id',function(done){
      this.cache.fetch("ID","URL1")
      .then(() => this.cache.invalidate("ID"))
      .then(() => this.cache.fetch("ID","URL2"))
      .then(text => {
        setTimeout(()=> {
          assert.equal(text,"URL2");
          done();
        });
      });
    });

    it('should not invalidate all the cache when invalidate was called with a specific id',function(done){

      this.cache.fetch("ID1","URL1")
      .then(()=> this.cache.fetch("ID2","URL2"))
      .then(() => this.cache.invalidate("ID1"))
      .then(() => this.cache.fetch("ID2","URL4"))
      .then(text => {
        setTimeout(()=> {
          assert.equal(text,"URL2");
          done();
        });
      })
    });
});
});
