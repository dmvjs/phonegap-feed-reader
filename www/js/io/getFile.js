module.exports = function (filesystem, filename, create) {
	var promise = require('../util/promise').roll;
	return promise(filesystem.root.getFile, [filename, {create: !!create, exclusive: false}], filesystem.root);
}