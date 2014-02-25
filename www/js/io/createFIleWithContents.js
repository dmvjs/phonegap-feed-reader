var notify = require('../util/notify')
	, promise = require('../util/promise').promise
	, getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile')
	, getFileEntry = require('./getFileEntry')
	, writeFile = require('./writeFile');

function tryToWriteFile(p, filewriter, contents) {
	$.when(writeFile(filewriter, contents))
		.done(p.y).fail(p.n);
}

function tryToGetFileEntry(p, fileentry, contents) {
	$.when(getFileEntry(fileentry))
		.done(function (filewriter) {
			tryToWriteFile(p, filewriter, contents);
		});
}

function tryToGetFile(p, filesystem, filename, contents) {
	$.when(getFile(filesystem, filename, {create: true, exclusive: false}))
		.done(function (fileentry) {
			tryToGetFileEntry(p, fileentry, contents);
		});
}

function tryToGetFileSystem(p, filename, contents) {
	$.when(getFileSystem())
		.done(function (filesystem) {
			tryToGetFile(p, filesystem, filename, contents);
		});
}

module.exports = function (filename, contents) {
	var p = promise();
	tryToGetFileSystem({y:p.y, n:p.n}, filename, contents);
	return p.p;
}

