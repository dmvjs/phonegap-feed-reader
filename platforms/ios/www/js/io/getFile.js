var config = require('../app/config');

module.exports = function (filesystem, filename, create) {
	return new Promise(function (resolve, reject) {
		config.fs.getFile(filename, {create: !!create, exclusive: false}, resolve, reject);
	});
}