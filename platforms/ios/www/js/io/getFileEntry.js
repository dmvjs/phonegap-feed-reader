module.exports = function (fileentry) {
	var promise = require('../util/promise').promise
		, p = promise();
	fileentry.createWriter(p.y, p.n);
	return p.p;
}