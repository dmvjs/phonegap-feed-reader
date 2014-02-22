var notify = require('./notify'),
	promise = require('./promise');

function getFileSystem() {
	var p = promise();
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, p.y, p.n);
	return p.p;
}

function getFile(filesystem, filename) {
	var p = promise();
	filesystem.root.getFile(filename, {create: false, exclusive: false}, p.y, p.n);
	return p.p;
}

function tryToGetFileSystem(filename) {
    $.when(getFileSystem()).done(
		function (filesystem) {
			tryToGetFile(filesystem, filename)
		});
}

function tryToGetFile(filesystem, filename) {
	$.when(getFile(filesystem, filename)).done(
		function () {
			notify.y()
		}).fail(function () {
			notify.n()
		});
}

module.exports = {
	doesFileExist: tryToGetFileSystem
}


