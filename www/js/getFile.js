module.exports = function (filesystem, filename) {
	var promise = require('./promise'),
		p = promise();
	filesystem.root.getFile(filename, {create: false, exclusive: false}, p.y, p.n);
	return p.p;
}