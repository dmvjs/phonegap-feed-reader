(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = [{
	url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-english.xml',
	name: 'English'
}];
},{}],2:[function(require,module,exports){
module.exports = (function () {
	var config = require('./config')
		, notify = require('./util/notify')
		, doesFileExist = require('./io/doesFileExist')
		, createFileWithContents = require('./io/createFileWithContents')
		, getFileContents = require('./io/getFileContents');

	$(function() {
		$('body').append($('<div/>', {
			'text': 'Does ' + config[0].url.split('/').pop() + ' exist?'
			, 'css': {
				'height': '50px'
				, 'width': '100%'
				, 'background-color': '#F1F1F1'
				, 'text-align': 'center'
				, 'line-height': '50px'
				, 'font-family': 'sans-serif'
			},
			'click': function () {
				var url = config[0].url
				$.ajax({
						url: url,
						dataType: 'text'
					})
					.done(function (res) {
						checkFileWithPromise(url.split('/').pop(), res)
					})
					.error(function () {
						//must be offline, or bad url, or...
						doesFileExist('test.html');
					})
			}
		}))
	});

	function checkFileWithPromise(filename, res) {
		$.when(doesFileExist(filename))
			.then(function() {
					readFileWithPromise(filename);
				}, function(err) {
					writeFileWithPromise(filename, res)
				});
	}

	function writeFileWithPromise(filename, contents) {
		$.when(createFileWithContents(filename, contents))
			.then(function() {
					readFileWithPromise(filename);
				}, function(err) {
					notify.n('from writeFileWithPromise');
				});
	}

	function readFileWithPromise(filename) {
		$.when(getFileContents(filename))
			.then(function(res) {
					console.log(res);
					notify.y('from readFileWithPromise');
				}, function(err) {
					notify.n('from readFileWithPromise');
				});
	}
}())
},{"./config":1,"./io/createFileWithContents":4,"./io/doesFileExist":5,"./io/getFileContents":8,"./util/notify":13}],3:[function(require,module,exports){
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

module.exports = (function () {
    document.addEventListener('deviceready', appReady, false);

    function appReady() {
        var getFeeds = require('./feeds');
    }
}());

},{"./feeds":2}],4:[function(require,module,exports){
var notify = require('../util/notify')
	, promise = require('../util/promise').wrap
	, getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile')
	, getFileEntry = require('./getFileEntry')
	, writeFile = require('./writeFile')
	, err = require('./error');

module.exports = function (filename, contents) {
	return promise(function (p) {
		getFileSystem().then(function (filesystem) {
			getFile(filesystem, filename, true).then(function (fileentry) {  
				getFileEntry(fileentry).then(function (filewriter) {
					writeFile(filewriter, contents).then(p.y, p.n);
				}, err);
			}, err);
		}, err);
	})
};
},{"../util/notify":13,"../util/promise":14,"./error":6,"./getFile":7,"./getFileEntry":9,"./getFileSystem":10,"./writeFile":12}],5:[function(require,module,exports){
var notify = require('../util/notify')
	, promise = require('../util/promise').wrap
	, getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile')
	, err = require('./error');

module.exports = function (filename) {
	return promise(function (p) {
		getFileSystem().then(function (filesystem) {
			getFile(filesystem, filename).then(p.y, p.n);
		}, err);
	})
}
},{"../util/notify":13,"../util/promise":14,"./error":6,"./getFile":7,"./getFileSystem":10}],6:[function(require,module,exports){
module.exports = function (err) {
  console.log(err);
};
},{}],7:[function(require,module,exports){
module.exports = function (filesystem, filename, create) {
	var promise = require('../util/promise').roll;
	return promise(filesystem.root.getFile, [filename, {create: !!create, exclusive: false}], filesystem.root);
}
},{"../util/promise":14}],8:[function(require,module,exports){
var notify = require('../util/notify')
  , promise = require('../util/promise').wrap
  , getFileSystem = require('./getFileSystem')
  , getFile = require('./getFile')
  , readFile = require('./readFile')
  , err = require('./error');

module.exports = function (filename) {
  return promise(function (p) {
    getFileSystem().then(function (filesystem) {
      getFile(filesystem, filename).then(function (fileentry) {
        readFile(fileentry).then(p.y, p.n);
      }, err);
    }, err);
  })
}
},{"../util/notify":13,"../util/promise":14,"./error":6,"./getFile":7,"./getFileSystem":10,"./readFile":11}],9:[function(require,module,exports){
module.exports = function (fileentry) {
	var promise = require('../util/promise').roll;
	return promise(fileentry.createWriter, [], fileentry);
};
},{"../util/promise":14}],10:[function(require,module,exports){
module.exports = function () {
	var promise = require('../util/promise').roll;
	return promise(window.requestFileSystem, [LocalFileSystem.PERSISTENT, 0]);
};
},{"../util/promise":14}],11:[function(require,module,exports){
var promise = require('../util/promise').promise;

module.exports = function (fileentry) {
    var p = promise()
    , reader = new FileReader();

    fileentry.file(function (f) {
        reader.onloadend = function(e) {
            console.log(e)
            p.y(e.target.result);
        };

        reader.onerror = function (e) {
            p.n(e);
        };

        reader.readAsText(f);
    })

    return p.p;
}
},{"../util/promise":14}],12:[function(require,module,exports){
var promise = require('../util/promise').promise;

module.exports = function (filewriter, contents) {
	var p = promise();

  filewriter.onwriteend = function(e) {
    p.y();
  };

  filewriter.onerror = function (e) {
  	p.n();
  };

  filewriter.write(contents);

  return p.p;
}


},{"../util/promise":14}],13:[function(require,module,exports){
function alert(message, callback, title, buttonLabel) {
	navigator.notification.alert(message, callback, title, buttonLabel);
}

function confirm(message, callback, title, buttonLabels) {
	//title: defaults to 'Confirm'
	//buttonLabels: defaults to [OK, Cancel]
	navigator.notification.confirm(message, confirmCallback, title, buttonLabels);
}

function y(message) {
	alert(message || 'Yes', $.noop, 'W1N', 'MOAR!!!')
}

function n(message) {
	alert(message || 'No', $.noop, 'FA1L', 'Try again!')
}

module.exports = {
	alert: alert,
	confirm: confirm,
	y: y,
	n: n
};
},{}],14:[function(require,module,exports){
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
			a = []
			$.each(args, function (index, element) {
				a.push(element);
			})
			a.push(p.y);
			a.push(p.n);
		} else if (args === undefined) {
			a = [p.y, p.n];
		} else {
			args.push(p.y);
			args.push(p.n);
			a = args;
		}
		fn.apply(that || null, a);
		return p.p;
	}
};
},{}]},{},[3])