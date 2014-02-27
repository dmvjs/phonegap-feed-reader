var promise = require('../util/promise').promise;

module.exports = function (fileentry, url, filename) {
    var p = promise()
    , fileTransfer = new FileTransfer()
    , uri = encodeURI(url)
    , path = fileentry.toURL();

    console.log(path)

    fileTransfer.download(
      uri,
      path,
      function(entry) {
        console.log("download complete: " + entry.fullPath);
        p.y(entry);
      },
      function(error) {
        console.log(error);
        p.n(error);
      }, 
      false,
      {}
    );

    return p.p;
};