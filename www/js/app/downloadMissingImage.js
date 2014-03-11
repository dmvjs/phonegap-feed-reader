module.exports = (function () {
	var config = require('./config')
		, notify = require('../util/notify')
		, doesFileExist = require('../io/doesFileExist')
		, downloadExternalFile = require('../io/downloadExternalFile');

	return new Promise(function (resolve, reject) {
		function init(response) {
			var ref = response.toURL();

			config.fs = ref.substr(0, ref.lastIndexOf('/') + 1);
			config.missingImageRef = response;

			resolve(response);
		}

		doesFileExist(config.missingImage.split('/').pop()).then(init, function (reason) {
			if (navigator.connection.type !== 'none') {
				downloadExternalFile(config.missingImage).then(init, reject);
			} else {
				reject(reason)
			}
		})
	})
}())