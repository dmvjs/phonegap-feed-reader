var getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile')
	, downloadFile = require('./downloadFile');

module.exports = function (url) {
	
	var filename = url.split('/').pop();

	return new Promise(function (resolve, reject) {

		getFileSystem().then(function (filesystem) {
			getFile(filesystem, filename, false).then(resolve,
				function () {
					getFile(filesystem, filename, true).then(function (fileentry) {  
						downloadFile(fileentry, url).then(resolve, reject);
				}, reject);
			}) 
		}, reject);

	})
}