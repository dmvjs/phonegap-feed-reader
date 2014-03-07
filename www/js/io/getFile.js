module.exports = function (filesystem, filename, create) {
	
	return new Promise(function (resolve, reject) {

		filesystem.root.getFile(filename, {create: !!create, exclusive: false}, resolve, reject);

	});
}