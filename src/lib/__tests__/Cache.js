jest.dontMock("../Cache.js");

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
      .then(text => {
        expect(text).toBe("URL1")
        done();
      });
    });
    it('should fetch the first url properly for the second time', function(done) {
      this.cache.fetch("ID","URL1")
      .then(() => this.cache.fetch("ID","URL2"))
      .then(text => {
        expect(text).toBe("URL1")
        done();
      });
    });
  });
  describe('fetch and invalidate', function(){
    it('should fetch the second url after the cache was invalidate',function(done){
      this.cache.fetch("ID","URL1")
      .then(() => this.cache.invalidate())
      .then(() => this.cache.fetch("ID","URL2"))
      .then(text => {
        expect(text).toBe("URL2")
        done();
      });
      });
  })
});
