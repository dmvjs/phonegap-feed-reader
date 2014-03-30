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
		, preloadImages = require('./app/ui/preloadImages')
		, err = require('./util/err')
		, timeout = ['android'].indexOf(device.platform.toLowerCase()) > -1 ? 500 : 100;

	createDir().then(function () {
		downloadMissingImage().then(function () {
			access.get(0).then(function (contents) {
				//console.log(contents)
				var obj = (JSON.parse(contents.target._result))
					, filename = access.getFilenameFromId(0);

				menu.update(filename, 'Updated: ' + obj.lastBuildDate);
				storyList.show(obj).then(function () {
					header.showStoryList();

					setTimeout(function () {
						navigator.splashscreen.hide();
					}, timeout)
				})
			}, err);
		}, err)
	}, err)
}())