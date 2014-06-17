/*global module, require, $*/
module.exports = (function () {
	var access = require('./app/access')
		, responsive = require('./app/ui/responsive')
		, connection = require('./util/connection')
		, createDir = require('./io/createDir')
		, storyList = require('./app/ui/storyList')
		, notify = require('./util/notify')
		, header = require('./app/ui/header')
		, doesFileExist = require('./io/doesFileExist')
		, downloadMissingImage = require('./app/downloadMissingImage')
		, err = require('./util/err')
		, platform = device.platform.toLowerCase()
		, timeout = 500
		, menu;

	document.addEventListener('online', connection.online, false);
	document.addEventListener('offline', connection.offline, false);

	$('body').addClass(platform);

	function getFeed() {
		access.get(0).then(function (contents) {
			var obj = (JSON.parse(contents.target._result))
				, filename = access.getFilenameFromId(0)
				, date = obj.friendlyPubDate || obj.lastBuildDate;

			menu.update(filename, 'Updated: ' + date);
			storyList.show(obj).then(function () {
				header.showStoryList();

				setTimeout(function () {
					navigator.splashscreen.hide();
				}, timeout)
			})
		}, function () {
			analytics.trackEvent('Load', 'Error', 'JSON Parse Error', 10);
			notify.confirm('There was an error processing the feed data. Try again in a few minutes.', getFeed, null, ['Try again', 'Cancel']);
		});
	}

	createDir().then(function () {
		downloadMissingImage().then(function () {
			menu = require('./app/ui/menu');
			getFeed();
		}, err)
	}, err)
}());