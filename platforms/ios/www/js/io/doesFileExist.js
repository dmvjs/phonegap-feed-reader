var promise = require('../util/promise').wrap
	, getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile')
	, err = require('./error');

module.exports = function (filename) {
	return promise(function (p) {
		getFileSystem().then(function (filesystem) {
			getFile(filesystem, filename).then(p.y, p.n);
		}, err);
	})
}