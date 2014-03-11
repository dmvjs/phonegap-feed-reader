(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var notify = require('../util/notify')
	, config = require('./config')
	, connection = require('../util/connection')
	, createFileWithContents = require('../io/createFileWithContents')
	, getFileContents = require('../io/getFileContents')
	, doesFileExist = require('../io/doesFileExist')
	, toJson = require('./xmlToJson')
	, downloadExternalFile = require('../io/downloadExternalFile')
	, getFileList = require('../io/getFileList')
	, removeFile = require('../io/removeFile');

function getFeed(id) {
	return new Promise(function (resolve, reject) {
		get(id).then(function (fileentry) {
			var filename = fileentry.name || fileentry.target.localURL.split('/').pop();
			getFileContents(filename).then(function (contents) {
				var obj = (JSON.parse(contents.target._result));
				getImages(obj).then(function () {
					removeOrphanedImages().then(function () {
						resolve(contents);
					}, reject);
				}, reject);
			}, reject)
		}, reject)
	})
}

function getImages(feedObject) {
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
			      if (i === items) {
			      	resolve(data);
			      }
			    }).catch(reject);
		    }
		  });
  })
}

function getFeedFromConfig(id) {
	var feeds = [];
	config.menu.forEach(function (item) {
		if (item.feeds) {
			item.feeds.forEach(function (el) {
				feeds.push(el);
			})
		}
	})
	return feeds[id];
}

function getFilenameFromFeed(feed) {
	return feed.filename || feed.url.split('/').pop().split('.').shift() + '.json';
}

function getFilenameFromId(id) {
	var feed = getFeedFromConfig(id);
	return getFilenameFromFeed(feed)
}

function get(id) {
	// resolves when feed is downloaded
	return new Promise(function (resolve, reject) {
		var feed = getFeedFromConfig(id)
			, url = feed.url
			, filename = feed.filename || url.split('/').pop().split('.').shift() + '.json';

		if (navigator.connection.type !== 'none') {
			$.ajax({
				url: url
				, dataType: 'xml'
			}).then(function (res) {
				var obj = toJson(res);

				doesFileExist(filename).then(function () {
					//file exists
					getFileContents(filename).then(function (contents) {
						var json = JSON.stringify(contents.target._result);
						if (json.lastBuildDate === obj.lastBuildDate) {
							//no updates since last build
							resolve(contents)
						} else {
							//file is not current
							createFileWithContents(filename, JSON.stringify(obj)).then(resolve, reject);
						}
					}, reject) // file was created but doesn't exist? unlikely
				}, function () {
					//file does not exist
					createFileWithContents(filename, JSON.stringify(obj)).then(resolve, reject);
				});
			}, reject);
		} else {
			doesFileExist(filename).then(resolve, reject)
		}
	})
}



function removeOrphanedImages() {
	return new Promise(function (resolve, reject) {
		var images = ['image-unavailable_605x328.png'];
		getFileList().then(function (response) {
			var json = response.filter(function (element) {return element.name.split('.').pop() === 'json'})
				, imageFiles = response.filter(function (element) {return element.name.split('.').pop() !== 'json'})
				, filenames = json.map(function (element) {return element.name});

			Promise.all(
	    	filenames.map(getFileContents)
	  	).then(function (res) {
	  		var imagesToRemove = [];
	  		res.forEach(function (el) {
	  			var obj = JSON.parse(el.target.result)
	  			obj.story.forEach(function (ele) {
	  				if (ele.image && images.indexOf(ele.image.split('/').pop()) === -1) {
	  					images.push(ele.image.split('/').pop())
	  				}
	  			})
	  		})
	  		imagesToRemove = imageFiles.filter(function(val) {
				  return images.indexOf(val.name) === -1;
				});
	  		Promise.all(imagesToRemove.map(removeFile)).then(resolve, reject)
	  	});
		}, reject)
	})
}

function removeFeed(id) {
	return new Promise(function (resolve, reject) {
		var filename = getFilenameFromId(id);
			
		doesFileExist(filename).then(function (fileentry) {
			removeFile(fileentry).then(resolve, reject)
		}, reject);
	})
}

module.exports = {
	get: getFeed
	, getFilenameFromId: getFilenameFromId
	, getFilenameFromFeed: getFilenameFromFeed
	, removeFeed: removeFeed
};
},{"../io/createFileWithContents":10,"../io/doesFileExist":11,"../io/downloadExternalFile":12,"../io/getFileContents":15,"../io/getFileList":17,"../io/removeFile":21,"../util/connection":23,"../util/notify":24,"./config":2,"./xmlToJson":7}],2:[function(require,module,exports){
module.exports = {
	fs: void 0
	, menuMessage: 'Not yet downloaded'
	, missingImage: 'http://m.ceip.org/img/appsupport/image-unavailable_605x328.png'
	, missingImageRef: void 0
	, menu: [{
			title: 'Analysis'
			, sub: 'Read Offline'
			, feeds: [{
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-english-dc.xml'
				, name: 'Latest Analysis'
				, required: true
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-Top5.xml'
				, name: 'Most Popular'
			}]
		}, {
			title: 'Languages'
			, sub: 'Read Offline'
			, feeds: [{
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-english.xml'
				, name: 'English'
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-russian.xml'
				, name: 'Русский'
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-chinese.xml'
				, name: '中文'
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-arabic.xml'
				, name: 'عربي'
			}]
		}, {
			title: 'Global Centers'
			, sub: 'Read Offline'
			, feeds: [{
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-beijing.xml'
				, name: 'Beijing'
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-beirut.xml'
				, name: 'Beirut'
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-brussels.xml'
				, name: 'Brussels'
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-moscow.xml'
				, name: 'Moscow'
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-english-dc.xml'
				, name: 'Washington'
				, required: true
			}]
		}, {
			title: 'Blogs'
			, sub: 'From m.ceip.org'
			, links: [{
				url: 'http://m.ceip.org/moscow/eurasiaoutlook/'
				, name: 'Eurasia Outlook'
			}, {
				url: 'http://m.ceip.org/sada/'
				, name: 'Sada'
			}, {
				url: 'http://m.ceip.org/brussels/strategiceurope'
				, name: 'Strategic Europe'
			}]
		}, {
			title: 'Global Resources'
			, links: [{
				url: 'http://m.ceip.org/issues/'
				, name: 'Issues'
			}, {
				url: 'http://m.ceip.org/regions/'
				, name: 'Regions'
			}, {
				url: 'http://m.ceip.org/experts/'
				, name: 'Experts'
			}, {
				url: 'http://m.ceip.org/publications/'
				, name: 'Publications'
			}, {
				url: 'http://m.ceip.org/events/'
				, name: 'Events'
			}]
		}, {
			title: 'Explore'
			, links: [{
				url: 'http://m.ceip.org/about/'
				, name: 'About Us'
			}, {
				url: 'http://m.ceip.org/support/&lang=en'
				, name: 'Support Carnegie'
			}, {
				url: 'http://m.ceip.org/about/&fa=contact'
				, name: 'Help Desk'
			}, {
				url: 'http://m.ceip.org/about/&lang=en&fa=privacy'
				, name: 'Privacy Statement'
			}]
		}
	]
};
},{}],3:[function(require,module,exports){
module.exports = (function () {
	var config = require('./config')
		, notify = require('../util/notify')
		, doesFileExist = require('../io/doesFileExist')
		, downloadExternalFile = require('../io/downloadExternalFile');

	return new Promise(function (resolve, reject) {
		function init(response) {
			var ref = response.toURL();

			config.fs = ref.substr(0, ref.lastIndexOf('/') + 1);
			config.missingImageRef = response;

			resolve(response);
		}

		doesFileExist(config.missingImage.split('/').pop()).then(init, function (reason) {
			if (navigator.connection.type !== 'none') {
				downloadExternalFile(config.missingImage).then(init, reject);
			} else {
				reject(reason)
			}
		})
	})
}())
},{"../io/doesFileExist":11,"../io/downloadExternalFile":12,"../util/notify":24,"./config":2}],4:[function(require,module,exports){
module.exports = (function () {
	$('.show-menu').on('touchstart', function () {
		$('section.menu').toggleClass('active');
		$('section.story-list').toggleClass('active');
	})
}())
},{}],5:[function(require,module,exports){
var config = require('../config')
	, access = require('../access')
	, storyList = require('./storyList')
	, doesFileExist = require('../../io/doesFileExist')
	, getFileContents = require('../../io/getFileContents')
	, primary = false;

(function init() {
	var menuFragment = $('<section/>', {
		addClass: 'menu'
	});

	config.menu.forEach(function (obj) {
		var feed = !!obj.feeds
		, list = $('<ul/>', {
				addClass: 'menu-items'
			})
		, title = $('<span/>', {
				addClass: 'title'
				, text: obj.title || ''
			})
		, sub = $('<span/>', {
				addClass: 'sub'
				, text: obj.sub || ''
			})
		, sectionHeader = $('<div/>', {
				addClass: 'section-header'
			}).append(title).append(sub);

		if (feed) {
			obj.feeds.forEach(function (el) {
				var label = $('<div/>', {
					addClass: 'label'
					, text: el.name
				})
				, sub = $('<div/>', {
					addClass: 'sub'
					, text: 'Not yet downloaded'
					, 'data-url': el.filename || el.url.split('/').pop().split('.').shift() + '.json'
				})
				, container = $('<div/>', {
						addClass: 'menu-item-box'
					}).append(label).append(sub)
				, box = $('<div/>', {
						addClass: el.required ? 'check required' : 'check'
					})
				, link = $('<a/>', {
					addClass: 'menu-link feed'
				})
				, item = $('<li/>', {
					addClass: 'menu-item'
				}).append(link.append(container).append(box))
				, filename = access.getFilenameFromFeed(el);

				if (el.required && !primary) {
					primary = item;
					item.addClass('active')
				}

				doesFileExist(filename).then(function () {
					getFileContents(filename).then(function (contents) {
						var obj = (JSON.parse(contents.target._result));
						update(filename, 'Updated: ' + obj.lastBuildDate);
						box.addClass('checked');
					})
				})

				list.append(item);
			})
		} else {
			obj.links.forEach(function (el) {
				var label = $('<div/>', {
					addClass: 'label link'
					, text: el.name
				})
				, container = $('<div/>', {
						addClass: 'menu-item-box'
					}).append(label)
				, link = $('<a/>', {
					addClass: 'menu-link link'
					, href: el.url
					, target: '_system'
				})
				, item = $('<li/>', {
					addClass: 'menu-item'
				}).append(link.append(container));

				list.append(item);
			})
		}

		menuFragment.append(sectionHeader).append(list);

	});

	$('section.menu').replaceWith(menuFragment);

	$('a.menu-link .check').on('click', function (e) {
		//download a feed
		var index = $('section.menu li').index($(this).closest('li'))
		e.stopPropagation();

		if ($(this).hasClass('checked') && $(this).hasClass('required') === false) {
			remove(index);
		} else {
			if (navigator.connection.type !== 'none') {
				get(index, true);
			}
		}
	})

	$('a.menu-link.feed').on('click', function (e) {
		e.preventDefault();

		if (navigator.connection.type !== 'none') {
			get($('section.menu li').index($(this).closest('li')));
		}

		$('section.menu li.active').removeClass('active');
		$(e.currentTarget).closest('li').addClass('active');
	})

//$('.menu ul').index($(this).closest('ul'))
	$('a.menu-link.link').on('click', function (e) {
		//select a feed (download if needed)
		e.preventDefault();
		window.open(encodeURI($(e.currentTarget).prop('href')), '_system');
		$('section.menu li.active').removeClass('active');
		$(e.currentTarget).closest('li').addClass('active');
	})

}());

function update(filename, date) {
	var items = $('section.menu .menu-item-box .sub[data-url="' + filename + '"]');
	items.text(date);
	items.closest('li').find('.check').removeClass('loading').addClass('checked');
}

function get(id, loadOnly) {
	var filename = access.getFilenameFromId(id);
	$('section.menu .menu-item-box .sub[data-url="' + filename + '"]').closest('li').find('.check').addClass('loading');

	access.get(id).then(function (contents) {
		var obj = (JSON.parse(contents.target._result));

		if (!!loadOnly) {
			update(filename, 'Updated: ' + obj.lastBuildDate);
		} else {
			update(filename, 'Updated: ' + obj.lastBuildDate);
			storyList.show(obj);
			setTimeout(function () {
				$('section.menu').removeClass('active')
			}, 100)
		}

	}, function (error) {
		console.log(error)
		notify.alert('an error occured')
	});
}

function remove(id) {
	var filename = access.getFilenameFromId(id)
		, item = $('section.menu .menu-item-box .sub[data-url="' + filename + '"]').closest('li');

	access.removeFeed(id).then(function () {
		item.find('.check').removeClass('checked');
		item.find('.sub').text(config.menuMessage);
		if (item.hasClass('active')) {
			getFileContents(access.getFilenameFromId(0)).then(function (contents) {
				var obj = (JSON.parse(contents.target._result));
				storyList.show(obj);
				item.removeClass('active');
				primary.addClass('active');
			})
		}
	})
}

module.exports = {
	update: update
}
},{"../../io/doesFileExist":11,"../../io/getFileContents":15,"../access":1,"../config":2,"./storyList":6}],6:[function(require,module,exports){
var config = require('../config')
function show(feedObj) {
	var obj = feedObj.story
		, html = '';

  obj.forEach(function (element) {
    var image = element.image ? config.fs + element.image.split('/').pop() : config.missingImageRef.toURL();
    html += 
    '<li>\
    	<div class="story-item">\
    		<img src="' + image + '" class="story-image"/>\
  			<div class="story-text">\
  				<div class="story-title">' + element.title + '</div>\
  				<div class="story-author">' + element.author + '</div>\
  				<div class="story-date">' + element.pubDate + '</div>\
  			</div>\
  		</div>\
  	</li>';
  });

  $('.story-list ul').html(html);

  $('.story-item').on('click', function (e) {
    var li = $(this).closest('li'),
      index = $('.story-list ul li').index(li);
			$('.story-item.selected').removeClass('selected'); 
			$(this).addClass('selected');   
  });

  $('.story-image').on('error', function (e) {
    $(this).prop('src', config.missingImageRef.toURL());
  })
}

module.exports = {
	show: show
}
},{"../config":2}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
    	//setTimeout(function () {
				//require('./test');
				$(function () {
					require('./init');
				})
				setTimeout(function () {
					navigator.splashscreen.hide();
				}, 200)
    	//}, 6000)
      
    }
}());

},{"./init":9,"./util/connection":23}],9:[function(require,module,exports){
module.exports = (function () {
	var access = require('./app/access')
	, storyList = require('./app/ui/storyList')
	, header = require('./app/ui/header')
	, menu = require('./app/ui/menu')
	, doesFileExist = require('./io/doesFileExist')
	, getFileContents = require('./io/getFileContents')
	, downloadMissingImage = require('./app/downloadMissingImage');

	access.get(0).then(function (contents) {
		var obj = (JSON.parse(contents.target._result))
			, filename = access.getFilenameFromId(0);

		menu.update(filename, 'Updated: ' + obj.lastBuildDate);
		storyList.show(obj);

		$('.spinner').fadeOut();
		setTimeout(function () {
			$('.splash').fadeOut();
		}, 300)
	}, function (reason) {
		console.log(reason)
	});

}())
},{"./app/access":1,"./app/downloadMissingImage":3,"./app/ui/header":4,"./app/ui/menu":5,"./app/ui/storyList":6,"./io/doesFileExist":11,"./io/getFileContents":15}],10:[function(require,module,exports){
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
},{"./getFile":14,"./getFileEntry":16,"./getFileSystem":18,"./writeFile":22}],11:[function(require,module,exports){
var getFileSystem = require('./getFileSystem')
	, getFile = require('./getFile');

module.exports = function (filename) {
	return new Promise(function (resolve, reject) {
		getFileSystem().then(function (filesystem) {
			getFile(filesystem, filename).then(resolve, reject);
		}, reject)
	})
}
},{"./getFile":14,"./getFileSystem":18}],12:[function(require,module,exports){
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
},{"./downloadFile":13,"./getFile":14,"./getFileSystem":18}],13:[function(require,module,exports){
var config = require('../app/config');

module.exports = function (fileentry, url) {
  var fileTransfer = new FileTransfer()
  , uri = encodeURI(url)
  , path = fileentry.toURL();

  return new Promise(function (resolve, reject) {
	  function catchErrors(reason) {
	  	if (reason.http_status === 404) {
				resolve(config.missingFileRef)
			} else {
				reject(reason);
			}
	  }

    fileTransfer.download(uri, path, resolve, catchErrors, false, {})
  });
};
},{"../app/config":2}],14:[function(require,module,exports){
module.exports = function (filesystem, filename, create) {
	return new Promise(function (resolve, reject) {
		filesystem.root.getFile(filename, {create: !!create, exclusive: false}, resolve, reject);
	});
}
},{}],15:[function(require,module,exports){
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
},{"./getFile":14,"./getFileSystem":18,"./readFile":20}],16:[function(require,module,exports){
module.exports = function (fileentry) {
	return new Promise(function (resolve, reject) {
		fileentry.createWriter(resolve, reject);
	})
};
},{}],17:[function(require,module,exports){
var getFileSystem = require('./getFileSystem')
  , readDirectory = require('./readDirectory');

module.exports = function (filename) {
  return new Promise(function (resolve, reject) {
    getFileSystem().then(function (filesystem) {
      readDirectory(filesystem).then(resolve, reject);
    }, reject);
  })
}
},{"./getFileSystem":18,"./readDirectory":19}],18:[function(require,module,exports){
module.exports = function () {
	return new Promise(function (resolve, reject) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, resolve, reject)
	})
};
},{}],19:[function(require,module,exports){
module.exports = function (filesystem) {
	var reader = filesystem.root.createReader();
	return new Promise(function (resolve, reject) {
		reader.readEntries(resolve, reject);
	});
}
},{}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
module.exports = function (fileentry) {
    return new Promise(function (resolve, reject) {
        fileentry.remove(resolve, reject)
    });
};
},{}],22:[function(require,module,exports){
module.exports = function (filewriter, contents) {
  return new Promise(function (resolve, reject) {
    filewriter.onwriteend = resolve;
  	filewriter.onerror = reject;
    filewriter.write(contents);
  });
}


},{}],23:[function(require,module,exports){
function get() {
  return navigator.connection.type;
}

function online(e) {
		console.log(e)
    //alert(get())
}

function offline(e) {
    console.log(e)
    //alert(get());
}

module.exports = {
    online: online
    , offline: offline
    , get: get
}
},{}],24:[function(require,module,exports){
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
},{}]},{},[8])