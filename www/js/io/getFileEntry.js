module.exports = function (fileentry) {
	var promise = require('../util/promise').roll;
	return promise(fileentry.createWriter, [], fileentry);
};