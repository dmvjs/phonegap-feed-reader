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
			doesFileExist(filename).then(resolve, reject);
		}
	})
}

function removeOrphanedImages() {
	return new Promise(function (resolve, reject) {
		var images = ['image-unavailable_605x328.png'];
		getFileList().then(function (response) {
			var json = response.filter(function (element) {return element.name.split('.').pop() === 'json'})
				, imageFiles = response.filter(function (element) {
						var ext = element.name.split('.').pop()
						return ext === 'jpg' || ext === 'png' || ext === 'jpeg'
					})
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
			removeFile(fileentry).then(function () {
				removeOrphanedImages().then(resolve, reject);
			}, reject)
		}, reject);
	})
}

module.exports = {
	get: getFeed
	, getFilenameFromId: getFilenameFromId
	, getFilenameFromFeed: getFilenameFromFeed
	, removeFeed: removeFeed
};