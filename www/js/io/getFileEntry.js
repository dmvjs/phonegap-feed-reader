var promise = require('../util/promise').roll;

module.exports = function (fileentry) {
	return new Promise(function (resolve, reject) {
		
		fileentry.createWriter(resolve, reject);
	
	})
};