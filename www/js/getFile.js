module.exports = function (filesystem, filename, options) {
	var promise = require('./promise').promise
		, p = promise()
		, params = options || {create: false, exclusive: false};
	filesystem.root.getFile(filename, params, p.y, p.n);
	return p.p;
}