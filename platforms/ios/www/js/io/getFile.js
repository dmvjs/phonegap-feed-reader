var config = require('../app/config');

module.exports = function (filesystem, filename, create) {
	var fs = config.fs || filesystem;
	return new Promise(function (resolve, reject) {
		fs.getFile(filename, {create: !!create, exclusive: false}, resolve, reject);
	});
}