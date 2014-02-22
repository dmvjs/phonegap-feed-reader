var notify = require('./notify')
	, promise = require('./promise').promise
	, getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile')
	, getFileEntry = require('./getFileEntry')
	, writeFile = require('./writeFile');

function tryToWriteFile(p, filesystem, filename, fileentry, filewriter, contents) {
	$.when(writeFile(filewriter, contents))
		.done(p.y).fail(p.n);
}

function tryToGetFileEntry(p, filesystem, filename, fileentry, contents) {
	$.when(getFileEntry(fileentry))
		.done(function (filewriter) {
			tryToWriteFile(p, filesystem, filename, fileentry, filewriter, contents);
		});
}

function tryToGetFile(p, filesystem, filename, contents) {
	$.when(getFile(filesystem, filename, {create: true, exclusive: false}))
		.done(function (fileentry) {
			tryToGetFileEntry(p, filesystem, filename, fileentry, contents);
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

