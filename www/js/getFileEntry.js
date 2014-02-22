module.exports = function (fileentry) {
	var promise = require('./promise').promise
		, p = promise();
	fileentry.createWriter(p.y, p.n);
	return p.p;
}