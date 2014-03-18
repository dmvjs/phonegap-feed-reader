module.exports = (function () {
	var access = require('./app/access')
	, createDir = require('./io/createDir')
	, storyList = require('./app/ui/storyList')
	, notify = require('./util/notify')
	, header = require('./app/ui/header')
	, menu = require('./app/ui/menu')
	, doesFileExist = require('./io/doesFileExist')
	, getFileContents = require('./io/getFileContents')
	, downloadMissingImage = require('./app/downloadMissingImage')
	, err = require('./util/err');
	
	createDir().then(function () {
		downloadMissingImage().then(function () {
			access.get(0).then(function (contents) {
				var obj = (JSON.parse(contents.target._result))
					, filename = access.getFilenameFromId(0);

				menu.update(filename, 'Updated: ' + obj.lastBuildDate);
				storyList.show(obj).then(function () {
					header.showStoryList();
				})

				$('.spinner').fadeOut();
				setTimeout(function () {
					$('.splash').fadeOut();
				}, 300)
			}, err);
		}, err)
	}, err)
}())