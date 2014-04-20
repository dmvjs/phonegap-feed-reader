/*global module, require, $*/
module.exports = (function () {
	var access = require('./app/access')
    , createDir = require('./io/createDir')
    , storyList = require('./app/ui/storyList')
    , notify = require('./util/notify')
    , header = require('./app/ui/header')
    , doesFileExist = require('./io/doesFileExist')
    , downloadMissingImage = require('./app/downloadMissingImage')
    , err = require('./util/err')
    , responsive = require('./app/ui/responsive')
    , timeout = 500
    , menu;

	createDir().then(function () {
		downloadMissingImage().then(function () {
          menu = require('./app/ui/menu');
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
}());