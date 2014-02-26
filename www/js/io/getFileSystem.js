module.exports = function () {
	var promise = require('../util/promise').roll;
	return promise(window.requestFileSystem, [LocalFileSystem.PERSISTENT, 0]);
};