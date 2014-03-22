var getFileSystem = require('./getFileSystem')
  , getFile = require('./getFile')
  , readFile = require('./readFile')
  , notify = require('../util/notify');

module.exports = function (filename) {
  return new Promise(function (resolve, reject) {
    notify.y('trying')
    getFileSystem().then(function (filesystem) {
    	notify.y('fs')
      getFile(filesystem, filename).then(function (fileentry) {
      	notify.y('file')
        readFile(fileentry).then(resolve, reject);
      }, reject);
    }, reject);
  });
}