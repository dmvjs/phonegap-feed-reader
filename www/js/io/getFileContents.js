var getFileSystem = require('./getFileSystem')
  , getFile = require('./getFile')
  , readFile = require('./readFile');

module.exports = function (filename) {
  return new Promise(function (resolve, reject) {
    console.log('gfc part 2')
    getFileSystem().then(function (filesystem) {
      console.log('gfc filesystem', filesystem)
      getFile(filesystem, filename).then(function (fileentry) {
        console.log('gfc fileentry', fileentry)
        readFile(fileentry).then(resolve, reject);
      }, reject);
    }, reject);
  })
}