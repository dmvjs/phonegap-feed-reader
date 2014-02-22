module.exports = function () {
	var promise = require('./promise').promise,
		p = promise();
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, p.y, p.n);
	return p.p;
}