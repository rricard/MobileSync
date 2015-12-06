// import assert from "assert";
//
// global.fetch = (url) => Promise.resolve({
//   text: () => Promise.resolve(url)
// });
//
// const Cache = require("../Cache.js");
//
// describe('Cache', function() {
//   beforeEach(function() {
//     Cache.invalidate();
//   });
//
//   describe('cacheFetch', function() {
//     it('should fetch the url properly for the first time', function*() {
//       const res = yield Cache.fetch("ID","URL1");
//       assert.equal(res,"URL1");
//     });
//
//     it('should fetch the first url properly for the second time', function*() {
//       yield Cache.fetch("ID","URL1")
//       const res = yield Cache.fetch("ID","URL2")
//       assert.equal(res,"URL1");
//     });
//
//     it('should fetch the second url after the cache was invalidate',function*(){
//       yield Cache.fetch("ID","URL1");
//     Cache.invalidate();
//       const res = yield Cache.fetch("ID","URL2");
//       assert.equal(res,"URL2");
//     });
//
//     it('should invalidate a specific id',function*(){
//       yield Cache.fetch("ID","URL1");
//       Cache.invalidate("ID");
//       const res = yield Cache.fetch("ID","URL2");
//       assert.equal(res,"URL2");
//     });
//
//     it('should not invalidate all the cache when invalidate was called with a specific id',function*(){
//
//       yield Cache.fetch("ID1","URL1");
//       yield Cache.fetch("ID2","URL2");
//       Cache.invalidate("ID1");
//       const res = yield Cache.fetch("ID2","URL4");
//       assert.equal(res,"URL2");
//     });
// });
// });
