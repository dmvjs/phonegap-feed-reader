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
		, getFileContents = require('./io/getFileContents')
		, downloadExternalFile = require('./io/downloadExternalFile')
		, toJson = require('./xmlToJson');

	$(function() {
		$('body').append($('<div/>', {
			'text': 'Does ' + config[0].url.split('/').pop().split('.').shift() + '.json' + ' exist?'
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
				downloadExternalFile('http://carnegieendowment.org/images/article_images/Wendy_Sherman605.jpg', 'Wendy_Sherman605.jpg');
				/*$.ajax({
						url: url,
						dataType: 'xml'
					})
					.then(function (res) {
						var obj = toJson(res);
						checkFileWithPromise(url.split('/').pop().split('.').shift() + '.json', JSON.stringify(obj))
					}, function () {
						//must be offline, or bad url, or...
						doesFileExist('test.html');
					})*/
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
					console.log(JSON.parse(res));
					notify.y('from readFileWithPromise');
				}, function(err) {
					notify.n('from readFileWithPromise');
				});
	}
}())
},{"./config":1,"./io/createFileWithContents":4,"./io/doesFileExist":5,"./io/downloadExternalFile":6,"./io/getFileContents":10,"./util/notify":15,"./xmlToJson":17}],3:[function(require,module,exports){
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
var promise = require('../util/promise').wrap
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
},{"../util/promise":16,"./error":8,"./getFile":9,"./getFileEntry":11,"./getFileSystem":12,"./writeFile":14}],5:[function(require,module,exports){
var promise = require('../util/promise').wrap
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
},{"../util/promise":16,"./error":8,"./getFile":9,"./getFileSystem":12}],6:[function(require,module,exports){
var promise = require('../util/promise').wrap
	, getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile')
	, downloadFile = require('./downloadFile')
	, err = require('./error');

module.exports = function (url) {
	var filename = url.split('/').pop();
	return promise(function (p) {
		getFileSystem().then(function (filesystem) {
			getFile(filesystem, filename, true).then(function (fileentry) {  
				downloadFile(fileentry, url, filename).then(p.y, p.n);
			}, err);
		}, err);
	})
}
},{"../util/promise":16,"./downloadFile":7,"./error":8,"./getFile":9,"./getFileSystem":12}],7:[function(require,module,exports){
var promise = require('../util/promise').promise;

module.exports = function (fileentry, url, filename) {
    var p = promise()
    , fileTransfer = new FileTransfer()
    , uri = encodeURI(url)
    , path = fileentry.toURL();

    console.log(path)

    fileTransfer.download(
      uri,
      path,
      function(entry) {
        console.log("download complete: " + entry.fullPath);
        p.y(entry);
      },
      function(error) {
        console.log(error);
        p.n(error);
      }, 
      false,
      {}
    );

    return p.p;
};
},{"../util/promise":16}],8:[function(require,module,exports){
module.exports = function (err) {
  console.log(err);
};
},{}],9:[function(require,module,exports){
module.exports = function (filesystem, filename, create) {
	var promise = require('../util/promise').roll;
	return promise(filesystem.root.getFile, [filename, {create: !!create, exclusive: false}], filesystem.root);
}
},{"../util/promise":16}],10:[function(require,module,exports){
var promise = require('../util/promise').wrap
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
},{"../util/promise":16,"./error":8,"./getFile":9,"./getFileSystem":12,"./readFile":13}],11:[function(require,module,exports){
module.exports = function (fileentry) {
	var promise = require('../util/promise').roll;
	return promise(fileentry.createWriter, [], fileentry);
};
},{"../util/promise":16}],12:[function(require,module,exports){
module.exports = function () {
	var promise = require('../util/promise').roll;
	return promise(window.requestFileSystem, [LocalFileSystem.PERSISTENT, 0]);
};
},{"../util/promise":16}],13:[function(require,module,exports){
var promise = require('../util/promise').promise;

module.exports = function (fileentry) {
    var p = promise()
    , reader = new FileReader();

    fileentry.file(function (f) {
        reader.onloadend = function(e) {
            p.y(e.target.result);
        };

        reader.onerror = function (e) {
            p.n(e);
        };

        reader.readAsText(f);
    })

    return p.p;
};
},{"../util/promise":16}],14:[function(require,module,exports){
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


},{"../util/promise":16}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
module.exports = function (res) {
	var feedObject = {}
    , root = res.firstChild.firstChild
    , numberOfFeeds = root.childNodes.length - 2
    , nodesInFeed = root.childNodes[2].childNodes.length
    , i
    , j;

  feedObject.title = root.childNodes[0].textContent;
  feedObject.lastBuildDate = root.childNodes[1].textContent;
  feedObject.story = [];

  for (i = 0; i < numberOfFeeds; i += 1) {
      feedObject.story[i] = {};
      for (j = 0; j < root.childNodes[2 + i].childNodes.length; j += 1) {
          feedObject.story[i][root.childNodes[2 + i].childNodes[j].nodeName] =
              root.childNodes[2 + i].childNodes[j].textContent;
      }
  }

  return feedObject;
}
},{}]},{},[3])