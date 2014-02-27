var promise = require('../util/promise').wrap
	, getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile')
	, downloadFile = require('./downloadFile')
	, err = require('./error');

module.exports = function (url) {
	var filename = url.split('/').pop();
	return promise(function (p) {
		getFileSystem().then(function (filesystem) {
			getFile(filesystem, filename, true).then(function (fileentry) {  
				downloadFile(fileentry, url, filename).then(p.y, p.n);
			}, err);
		}, err);
	})
}