/*global require, module, $*/
var notify = require('../util/notify')
  , config = require('./config')
  , connection = require('../util/connection')
  , createFileWithContents = require('../io/createFileWithContents')
  , getFileContents = require('../io/getFileContents')
  , doesFileExist = require('../io/doesFileExist')
  , toJson = require('./xmlToJson')
  , downloadExternalFile = require('../io/downloadExternalFile')
  , getFileList = require('../io/getFileList')
  , removeFile = require('../io/removeFile')
  , currentFeedId = void 0
  , feedRefresh = []
  , increment = 60000;

function getFeed(id, loadOnly) {
  return new Promise(function (resolve, reject) {
    if (!loadOnly) {
        currentFeedId = id;
    }
    get(id).then(function (fileentry) {
      console.log(fileentry, name);
      var filename;
      if (fileentry.name) {
        filename = fileentry.name;
      } else if (fileentry.target && fileentry.target.localURL) {
        filename = fileentry.target.localURL.split('/').pop();
      } else if (fileentry.target && fileentry.target._localURL) {
        filename = fileentry.target._localURL.split('/').pop();
      }
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

function refresh() {
  return new Promise(function (resolve, reject) {
    var id = currentFeedId || 0
      , filename = getFilenameFromId(id)
      , since = 0
      , last = feedRefresh[id]
      , now = new Date().valueOf();

    if (last !== undefined) {
      since = (now - last) > increment;
    }
    if (last === undefined || since) {
      feedRefresh[id] = now;
      getFeed(id).then(function (contents) {
	      var obj = (JSON.parse(contents.target._result));
        $(document).trigger('access.refresh', [obj, filename]);
        resolve(obj);
      }, reject);
        if (config.track && analytics) {
        analytics.trackEvent('StoryList', 'Feed', 'Pull to Refresh', 10);
      }
    } else {
      setTimeout(function () {
        reject('Delaying refresh');
      if (config.track && analytics) {
          analytics.trackEvent('StoryList', 'Feed', 'Pull to Refresh Fake', 10);
        }
      }, 2000);
    }
  })
}

function getStoryImageCount(element) {
  return element.image !== undefined
}

function getImages(feedObject) {
  return new Promise(function (resolve, reject) {
    var i = 0
      , stories = feedObject.story ? feedObject.story : feedObject.item
      , items = stories.filter(getStoryImageCount).length
      , prevPromise = Promise.resolve();

    stories.forEach(function(obj) {
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
  });
  return feeds[id];
}

function getFilenameFromFeed(feed) {
  return feed.filename || feed.url.split('/').pop().split('.').shift() + '.json';
}

function getFeedNameFromId(id) {
  var feed = getFeedFromConfig(id);
  return feed.name;
}

function getFilenameFromId(id) {
  var feed = getFeedFromConfig(id);
  return getFilenameFromFeed(feed)
}

function getCurrentId() {
  return currentFeedId || 0;
}

function get(id) {
  // resolves when feed is downloaded
  return new Promise(function (resolve, reject) {
    var feed = getFeedFromConfig(id)
      , url = feed.url
      , type = feed.type || 'xml'
      , filename = feed.filename || url.split('/').pop().split('.').shift() + '.json';

    if (navigator.connection.type !== 'none') {
      $.ajax({
        url: url
        , dataType: type
      }).then(function (res) {
        var obj = (type === 'json' ? (res && res.rss && res.rss.channel) : toJson(res));
        doesFileExist(filename).then(function () {
          //file exists
          getFileContents(filename).then(function (contents) {
	          var o = (JSON.parse(contents.target._result));
            if ((o.lastBuildDate === obj.lastBuildDate) && !isAnyCommentNew(obj, o)) {
              //no updates since last build
              resolve(contents);
            } else {
              createFileWithContents(filename, JSON.stringify(obj)).then(resolve, reject);
            }
          }, reject);// file was created but doesn't exist? unlikely
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

// if any lastCommentPosted prop doesn't match it's twin then a comment has been updated
function isAnyCommentNew (o1, o2) {
    var updated = false;
    if (o1 && o1.item && o1.item.length > 0 && o2 && o2.item && o2.item.length > 0) {
        $.each(o1.item, function (i, e) {
            var x = o2.item[i];
            if (e.lastCommentPosted !== x.lastCommentPosted) {
                updated = true;
                return false;
            }
        });
    }
    return updated;
}

function removeOrphanedImages() {
  return new Promise(function (resolve, reject) {
    var images = ['image-unavailable_605x328.png'];
    getFileList().then(function (response) {
      var json = response.filter(function (element) {return element.name.split('.').pop() === 'json'})
        , imageFiles = response.filter(function (element) {
            var ext = element.name.split('.').pop();
            return ext === 'jpg' || ext === 'png' || ext === 'jpeg'
          })
        , filenames = json.map(function (element) {return element.name});

      Promise.all(
        filenames.map(getFileContents)
      ).then(function (res) {
        var imagesToRemove = [];
        res.forEach(function (el) {
          var obj = (JSON.parse(el.target._result))
            , stories = obj.story ? obj.story : obj.item;

          stories.forEach(function (ele) {
            if (ele.image && images.indexOf(ele.image.split('/').pop()) === -1) {
              images.push(ele.image.split('/').pop())
            }
          })
        });
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
  , getCurrentId: getCurrentId
  , getFeedNameFromId: getFeedNameFromId
  , getFilenameFromId: getFilenameFromId
  , getFilenameFromFeed: getFilenameFromFeed
  , removeFeed: removeFeed
  , refresh: refresh
};