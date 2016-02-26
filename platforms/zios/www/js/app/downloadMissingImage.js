module.exports = function () {
	var config = require('./config')
		, notify = require('../util/notify')
		, doesFileExist = require('../io/doesFileExist')
		, downloadExternalFile = require('../io/downloadExternalFile');

	return new Promise(function (resolve, reject) {

		function init(response) {
			var ref = response.toURL();

			config.missingImageRef = response;
			resolve(response);
		}

		function getImage(reason) {

			if (navigator.connection.type !== 'none') {
				downloadExternalFile(config.missingImage).then(init, reject);
			} else {
				notify.alert(config.connectionMessage, getImage, null, 'Try again');
			}
		}

		doesFileExist(config.missingImage.split('/').pop()).then(init, getImage);
	})
}