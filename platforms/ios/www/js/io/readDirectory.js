module.exports = function (filesystem) {
	var reader = filesystem.root.createReader();
	return new Promise(function (resolve, reject) {
		reader.readEntries(resolve, reject);
	});
}