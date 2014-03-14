var config = require('../app/config');

module.exports = function (fileentry, url) {
  var fileTransfer = new FileTransfer()
  , uri = encodeURI(url)
  , path = fileentry.toURL();

  return new Promise(function (resolve, reject) {
	  function catchErrors(reason) {
	  	if (reason.http_status === 404) {
				resolve(config.missingFileRef)
			} else {
				reject(reason);
			}
	  }

	  console.log('PATH', path)

    fileTransfer.download(uri, path, resolve, catchErrors, false, {})
  });
};