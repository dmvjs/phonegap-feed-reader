var promise = require('../util/promise').roll;

module.exports = function () {
	return new Promise(function (resolve, reject) {

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, resolve, reject)

	})
};