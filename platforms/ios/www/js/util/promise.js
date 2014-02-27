function promise() {
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
}

module.exports = {
	promise: promise,
	wrap: function (fn, args) {
		var p = promise()
			, po = {y:p.y, n:p.n}
			, a;

		if (Array.isArray(args)) {
			a = [po]
			$.each(args, function (index, element) {
				a.push(element);
			})
		} else if (args === undefined) {
			a = [po];
		} else {
			a = [po, args];
		}
		fn.apply(null, a);
		return p.p;
	},
	roll: function (fn, args, that) {
		var p = promise()
			, a;

		if (Array.isArray(args)) {
			args.push(p.y, p.n);
			a = args;
		} else if (args === undefined) {
			a = [p.y, p.n];
		} else {
			a = [args, p.y, p.n];
		}
		fn.apply(that || null, a);
		return p.p;
	}
};