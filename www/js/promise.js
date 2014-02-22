module.exports = function () {
	var deferred = new $.Deferred();
	return {
		y: function (res) {
			deferred.resolve(res);
		}
		, n: function (err) {
			deferred.reject(err);
		}
		, p: deferred.promise()
	}
};