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