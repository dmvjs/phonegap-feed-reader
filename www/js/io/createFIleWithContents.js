/*global module, require*/
var getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile')
	, getFileEntry = require('./getFileEntry')
	, writeFile = require('./writeFile');

module.exports = function (filename, contents) {
	return new Promise(function (resolve, reject) {

		// full set of Crockford's problem characters https://github.com/douglascrockford/JSON-js/blob/master/json2.js
		//[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff
		var reg = /[\u000a\u000d\u2028\u2029]/g; // known problem characters, line terminators
		contents = contents.replace(reg, '');

		try {
			JSON.parse(contents);
		} catch (e) {
			if (void 0 !== window.analytics) {
				analytics.trackEvent('Feed', 'Error', 'JSON Parse Error: ' + filename, 10);
			}
			reject()
		}

		getFileSystem().then(function (filesystem) {
			getFile(filesystem, filename, true).then(function (fileentry) {  
				getFileEntry(fileentry).then(function (filewriter) {
					writeFile(filewriter, contents).then(resolve, reject);
				}, reject);
			}, reject);
		}, reject);
	})
};