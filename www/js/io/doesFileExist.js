var notify = require('../util/notify')
	, promise = require('../util/promise').promise
	, getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile');

function tryToGetFile(p, filesystem, filename) {
	$.when(getFile(filesystem, filename))
		.done(p.y).fail(p.n);
}

function tryToGetFileSystem(p, filename) {
	$.when(getFileSystem())
		.done(function (filesystem) {
			tryToGetFile(p, filesystem, filename);
		});
}

module.exports = function (filename) {
	var p = promise()
	tryToGetFileSystem({y:p.y, n:p.n}, filename);
	return p.p;
}

