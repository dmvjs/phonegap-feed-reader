var config = require('../app/config');

module.exports = function (filesystem) {
	var fs = config.fs || filesystem.root
		, reader = fs.createReader();
	return new Promise(function (resolve, reject) {
		console.log('reader', fs)
		reader.readEntries(resolve, reject);
	});
}