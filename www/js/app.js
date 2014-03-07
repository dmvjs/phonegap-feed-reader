(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var notify = require('../util/notify')
		, createFileWithContents = require('../io/createFileWithContents')
		, getFileContents = require('../io/getFileContents')
		, doesFileExist = require('../io/doesFileExist')
		, toJson = require('./xmlToJson')
		, downloadExternalFile = require('../io/downloadExternalFile');

function downloadFeedImages(feedObject) {
	return new Promise(function (resolve, reject) {
  	var i = 0
  		, items = feedObject.story.filter(function (element) {return element.image !== undefined}).length
  		, prevPromise = Promise.resolve();

	  	feedObject.story.forEach(function(obj) { 
		    if (obj.image) {
		    	prevPromise = prevPromise.then(function() {
			      return downloadExternalFile(obj.image);
			    }).then(function(data) {
			      i += 1;
			      if (i === items - 1) {
			      	resolve(data);
			      }
			    }).catch(reject);
		    }
		  });
  })
}

function writeFileWithPromise(filename, contents) {
	createFileWithContents(filename, contents)
		.then(function() {
				readFileWithPromise(filename);
			}, function(err) {
				notify.n('from writeFileWithPromise');
			});
}

function readFileWithPromise(filename) {
	getFileContents(filename)
		.then(function(res) {
				downloadFeedImages(JSON.parse(res.target.result)).then(function () {
					console.log('done')
				});
				//notify.y('from readFileWithPromise');
			}, function(err) {
				notify.n('from readFileWithPromise');
			});
}

function get(url) {
	$.ajax({
		url: url,
		dataType: 'xml'
	})
	.then(function (res) {
		var obj = toJson(res),
			filename = url.split('/').pop().split('.').shift() + '.json';

		doesFileExist(filename).then(function (fileentry) {
			console.log('feed Exists')
			downloadFeedImages(obj).then(function () {
				console.log('done')
			});
		}, function () {
			writeFileWithPromise(filename, JSON.stringify(obj));
		})
	}, function (err) {
		//must be offline, or bad url, or...
		console.log(err);
	})
}

module.exports = {
	get: get
	, getImages: downloadFeedImages
	, writeFile: writeFileWithPromise
	, readFile: readFileWithPromise
};
},{"../io/createFileWithContents":6,"../io/doesFileExist":7,"../io/downloadExternalFile":8,"../io/getFileContents":11,"../util/notify":17,"./xmlToJson":3}],2:[function(require,module,exports){
module.exports = [{
	url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-english.xml',
	name: 'English'
}];
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
module.exports = (function () {
	var config = require('./app/config')
		, notify = require('./util/notify')
		, downloadExternalFile = require('./io/downloadExternalFile')
		, access = require('./app/access');

	// make sure the missing image file is available
	downloadExternalFile('http://m.ceip.org/img/appsupport/image-unavailable_605x328.png');

	$(function() {
		$('body').append($('<div/>', {
			'text': 'Download feed'
			, 'css': {
				'height': '50px'
				, 'width': '100%'
				, 'background-color': '#F1F1F1'
				, 'text-align': 'center'
				, 'line-height': '50px'
				, 'font-family': 'sans-serif'
			},
			'click': function () {
				access.get(config[0].url);
			}
		}))
	});
}())
},{"./app/access":1,"./app/config":2,"./io/downloadExternalFile":8,"./util/notify":17}],5:[function(require,module,exports){
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

var connection = require('./util/connection');

module.exports = (function () {
		document.addEventListener('online', connection.online, false);
		document.addEventListener('offline', connection.offline, false);
    document.addEventListener('deviceready', appReady, false);

    function appReady() {
      var getFeeds = require('./feeds');
    }
}());

},{"./feeds":4,"./util/connection":16}],6:[function(require,module,exports){
var getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile')
	, getFileEntry = require('./getFileEntry')
	, writeFile = require('./writeFile');

module.exports = function (filename, contents) {

	return new Promise(function (resolve, reject) {

		getFileSystem().then(function (filesystem) {
			getFile(filesystem, filename, true).then(function (fileentry) {  
				getFileEntry(fileentry).then(function (filewriter) {
					writeFile(filewriter, contents).then(resolve, reject);
				}, reject);
			}, reject);
		}, reject);

	})
};
},{"./getFile":10,"./getFileEntry":12,"./getFileSystem":13,"./writeFile":15}],7:[function(require,module,exports){
var getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile');

module.exports = function (filename) {
	return new Promise(function (resolve, reject) {

		getFileSystem().then(function (filesystem) {
			getFile(filesystem, filename).then(resolve, reject);
		}, reject)

	})
}
},{"./getFile":10,"./getFileSystem":13}],8:[function(require,module,exports){
var getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile')
	, downloadFile = require('./downloadFile');

module.exports = function (url) {
	
	var filename = url.split('/').pop();

	return new Promise(function (resolve, reject) {

		getFileSystem().then(function (filesystem) {
			getFile(filesystem, filename, false).then(resolve,
				function () {
					getFile(filesystem, filename, true).then(function (fileentry) {  
						downloadFile(fileentry, url).then(resolve, reject);
				}, reject);
			}) 
		}, reject);

	})
}
},{"./downloadFile":9,"./getFile":10,"./getFileSystem":13}],9:[function(require,module,exports){
module.exports = function (fileentry, url) {
  
  var fileTransfer = new FileTransfer()
  , uri = encodeURI(url)
  , path = fileentry.toURL();

  return new Promise(function (resolve, reject) {

    fileTransfer.download(uri, path, resolve, reject, false, {})

  });
};
},{}],10:[function(require,module,exports){
module.exports = function (filesystem, filename, create) {
	
	return new Promise(function (resolve, reject) {

		filesystem.root.getFile(filename, {create: !!create, exclusive: false}, resolve, reject);

	});
}
},{}],11:[function(require,module,exports){
var getFileSystem = require('./getFileSystem')
  , getFile = require('./getFile')
  , readFile = require('./readFile');

module.exports = function (filename) {

  return new Promise(function (resolve, reject) {

    getFileSystem().then(function (filesystem) {
      getFile(filesystem, filename).then(function (fileentry) {
        readFile(fileentry).then(resolve, reject);
      }, reject);
    }, reject);

  })
}
},{"./getFile":10,"./getFileSystem":13,"./readFile":14}],12:[function(require,module,exports){
var promise = require('../util/promise').roll;

module.exports = function (fileentry) {
	return new Promise(function (resolve, reject) {
		
		fileentry.createWriter(resolve, reject);
	
	})
};
},{"../util/promise":18}],13:[function(require,module,exports){
var promise = require('../util/promise').roll;

module.exports = function () {
	return new Promise(function (resolve, reject) {

		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, resolve, reject)

	})
};
},{"../util/promise":18}],14:[function(require,module,exports){
module.exports = function (fileentry) {
    
    var reader = new FileReader();

    return new Promise(function (resolve, reject) {

        fileentry.file(function (f) {
            
            reader.onloadend = resolve;

            reader.onerror = reject;

            reader.readAsText(f);
        })

    });
};
},{}],15:[function(require,module,exports){
module.exports = function (filewriter, contents) {

  return new Promise(function (resolve, reject) {

    filewriter.onwriteend = resolve;

  	filewriter.onerror = reject;

    filewriter.write(contents);

  });
}


},{}],16:[function(require,module,exports){
function get() {
  return navigator.connection.type;
}

function online() {
    //alert(get())
}

function offline() {
    //alert(get());
}

module.exports = {
    online: online
    , offline: offline
    , get: get
}
},{}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
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
},{}]},{},[5])