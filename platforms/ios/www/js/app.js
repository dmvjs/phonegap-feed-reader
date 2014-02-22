(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = [{
	url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-english.xml',
	name: 'English'
}];
},{}],2:[function(require,module,exports){
var notify = require('./notify')
	, promise = require('./promise').promise
	, getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile')
	, getFileEntry = require('./getFileEntry')
	, writeFile = require('./writeFile');

function tryToWriteFile(p, filesystem, filename, fileentry, filewriter, contents) {
	$.when(writeFile(filewriter, contents))
		.done(p.y).fail(p.n);
}

function tryToGetFileEntry(p, filesystem, filename, fileentry, contents) {
	$.when(getFileEntry(fileentry))
		.done(function (filewriter) {
			tryToWriteFile(p, filesystem, filename, fileentry, filewriter, contents);
		});
}

function tryToGetFile(p, filesystem, filename, contents) {
	$.when(getFile(filesystem, filename, {create: true, exclusive: false}))
		.done(function (fileentry) {
			tryToGetFileEntry(p, filesystem, filename, fileentry, contents);
		});
}

function tryToGetFileSystem(p, filename, contents) {
    $.when(getFileSystem())
    	.done(function (filesystem) {
			tryToGetFile(p, filesystem, filename, contents);
		});
}

module.exports = function (filename, contents) {
	var p = promise();
	tryToGetFileSystem({y:p.y, n:p.n}, filename, contents);
	return p.p;
}


},{"./getFile":5,"./getFileEntry":6,"./getFileSystem":7,"./notify":9,"./promise":10,"./writeFile":11}],3:[function(require,module,exports){
var notify = require('./notify')
	, promise = require('./promise').promise
	, getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile');

function tryToGetFile(p, filesystem, filename) {
	$.when(getFile(filesystem, filename))
		.done(p.y).fail(p.n);
}

function tryToGetFileSystem(p, filename) {
    $.when(getFileSystem())
    	.done(function (filesystem) {
			tryToGetFile(p, filesystem, filename);
		});
}

module.exports = function (filename) {
	var p = promise()
	tryToGetFileSystem({y:p.y, n:p.n}, filename);
	return p.p;
}


},{"./getFile":5,"./getFileSystem":7,"./notify":9,"./promise":10}],4:[function(require,module,exports){
module.exports = (function () {
	var config = require('./config')
		, notify = require('./notify')
		, doesFileExist = require('./doesFileExist')
		, createFileWithContents = require('./createFileWithContents');

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
				$.ajax(url)
					.done(function (res) {
						checkFileWithPromise(url.split('/').pop())
					})
					.error(function () {
						//must be offline, or bad url, or...
						doesFileExist('test.html');
					})
			}
		}))
	});

	function checkFileWithPromise(filename) {
		$.when(doesFileExist(filename))
			.done(function(){
				notify.y('from checkFileWithPromise');
				//writeFileWithPromise(filename, 'ZZSUPERCALI')
			})
			.fail(function(){
				writeFileWithPromise(filename, 'ZZSUPERCALI')
				//notify.n();
			});
	}

	function writeFileWithPromise(filename, contents) {
		$.when(createFileWithContents(filename, contents))
			.done(function(){
				notify.y('from writeFileWithPromise');
			})
			.fail(function(){
				notify.n('from writeFileWithPromise');
			});
	}
}())
},{"./config":1,"./createFileWithContents":2,"./doesFileExist":3,"./notify":9}],5:[function(require,module,exports){
module.exports = function (filesystem, filename, options) {
	var promise = require('./promise').promise
		, p = promise()
		, params = options || {create: false, exclusive: false};
	filesystem.root.getFile(filename, params, p.y, p.n);
	return p.p;
}
},{"./promise":10}],6:[function(require,module,exports){
module.exports = function (fileentry) {
	var promise = require('./promise').promise
		, p = promise();
	fileentry.createWriter(p.y, p.n);
	return p.p;
}
},{"./promise":10}],7:[function(require,module,exports){
module.exports = function () {
	var promise = require('./promise').promise,
		p = promise();
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, p.y, p.n);
	return p.p;
}
},{"./promise":10}],8:[function(require,module,exports){
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

},{"./feeds":4}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
	promise: promise
};
},{}],11:[function(require,module,exports){
var promise = require('./promise').promise;

module.exports = function (filewriter, contents) {
	var p = promise()

    filewriter.onwriteend = function(e) {
        p.y()
    };
    filewriter.onerror = function (e) {
    	p.n()
    }
    filewriter.write(contents);

    return p.p;
}


},{"./promise":10}]},{},[8])