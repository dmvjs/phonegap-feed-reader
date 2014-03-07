function roll(func, args, context) {
	// insert promise success & fail as the last two arguments of function signature
	return  new Promise(function (resolve, reject) {
		var a;

		function success(response) {
			resolve(response)
		};

		function fail(reason) {
			reject(reason)
		};

		if (Array.isArray(args)) {
			args.push(success, fail);
			a = args;
		} else if (args === undefined) {
			a = [success, fail];
		} else {
			a = [args, success, fail];
		}
		
		func.apply(context || null, a);
	});
}

function wrap(func, args, context) {
	// insert an object with success & fail properties as the first argument of function signature
	return  new Promise(function (resolve, reject) {
		var a = {success:success, fail:fail};

		function success(response) {
			resolve(response)
		};

		function fail(reason) {
			reject(reason)
		};

		if (Array.isArray(args)) {
			$.each(args, function (index, element) {
				a.push(element);
			})
		} else if (args !== undefined){
			a.push(args);
		}

		func.apply(context || null, a);
	});
}

module.exports = {
	wrap: wrap
	, roll: roll
}