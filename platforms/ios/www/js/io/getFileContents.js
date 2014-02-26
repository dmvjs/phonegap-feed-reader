var notify = require('../util/notify')
  , promise = require('../util/promise').wrap
  , getFileSystem = require('./getFileSystem')
  , getFile = require('./getFile')
  , readFile = require('./readFile')
  , err = require('./error');

module.exports = function (filename) {
  return promise(function (p) {
    getFileSystem().then(function (filesystem) {
      getFile(filesystem, filename).then(function (fileentry) {
        readFile(fileentry).then(p.y, p.n);
      }, err);
    }, err);
  })
}