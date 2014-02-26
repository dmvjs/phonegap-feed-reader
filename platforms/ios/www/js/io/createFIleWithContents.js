var notify = require('../util/notify')
	, promise = require('../util/promise').wrap
	, getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile')
	, getFileEntry = require('./getFileEntry')
	, writeFile = require('./writeFile')
	, err = require('./error');

module.exports = function (filename, contents) {
	return promise(function (p) {
		getFileSystem().then(function (filesystem) {
			getFile(filesystem, filename, true).then(function (fileentry) {  
				getFileEntry(fileentry).then(function (filewriter) {
					writeFile(filewriter, contents).then(p.y, p.n);
				}, err);
			}, err);
		}, err);
	})
};