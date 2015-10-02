/*global require, module, $*/
var config = require('../config')
  , connection = require('../../util/connection')
  , header = require('./header')
	, notify = require('../../util/notify')
  , story = require('./story')
  , refresh = require('./refresh')
	, android = device.platform.toLowerCase() === 'android'
	, version = device.version.split('.')
	// allow iOS devices and Android devices 4.4 and up to have pull to refresh
	, allowRefresh = !android || (parseInt(version[0], 10) > 4) || ((parseInt(version[0], 10) === 4) && (parseInt(version[1], 10) >= 4));

function show(feedObj, forceActive) {
	return new Promise(function(resolve, reject) {
    var obj = feedObj.story ? feedObj.story : feedObj.item
      , rtl = /[\u0600-\u06FF\u0750-\u077F]/.test(feedObj.title) || feedObj.title.toLowerCase().indexOf('arabic') > -1
      , fs = config.fs.toURL()
      , path = fs + (fs.substr(-1) === '/' ? '' : '/')
      , pullTop = $('<div/>', {
        id: 'pullrefresh-icon'
      })
      , message = $('<div/>', {
        addClass: 'message'
        , text: ''
      }).append(pullTop)
      , pull = $('<div/>', {
        id: 'pullrefresh'
      }).append(message)
      , topBar = $('<div/>', {
        addClass: 'top-bar'
        , text: 'Updated: ' + (feedObj.friendlyPubDate !== undefined ? feedObj.friendlyPubDate : feedObj.lastBuildDate)
      })
      , ul = $('<ul/>', {})
      , container = $('<div/>', {
        id: 'story-list-container'
      }).append(topBar).append(pull).append(ul)
      , section = $('<section/>', {
        addClass: 'story-list' + (!!forceActive ? ' active' : '')
        , dir: rtl ? 'rtl' : 'ltr'
      }).append(container).toggleClass('rtl', rtl)
      , sent = false;

    obj.forEach(function (element) {
      var image = element.image ? path + element.image.split('/').pop() : config.missingImageRef.toURL()
        , storyTitle = $('<div/>', {
          addClass: 'story-title'
          , text: element.title
        })
        , storyAuthor = $('<div/>', {
          addClass: 'story-author'
          , text: element.author
        })
        , storyDate = $('<div/>', {
          addClass: 'story-date'
          , text: element.publishDate || element.pubDate
        })
        , storyText = $('<div/>', {
          addClass: 'story-text'
        }).append(storyTitle).append(storyAuthor).append(storyDate)
        , storyImage = $('<img>', {
          src: image
          , addClass: 'story-image'
        })
        , hairline = $('<div/>', {
          addClass: 'hairline'
        })
        , storyItem = $('<div/>', {
          addClass: 'story-item'
        }).append(hairline).append(storyImage).append(storyText)
        , li = $('<li/>', {}).append(storyItem);

        ul.append(li);
    });

    $('.container section.story-list').replaceWith(section);

		/*$('#story-list-container').on('touchmove touchend', function () {
			var pos = parseInt($('#story-list-container').offset().top, 10);
			var lastLi = $('#story-list-container').find('ul').find('li').last();
			var fLi = $('#story-list-container').find('ul').find('li').first();
			if (pos <= -500) {
				$('#story-list-container').offset({top:lastLi.offset().top})
			} else if (pos > 44) {
				$('#story-list-container').offset({top:fLi.offset().top})
			}
		});*/

    $('.story-item').on('click', function (e) {
        if (e.clientY > (parseInt($('header').height()) + 5)) {
            if (connection.get() === 'none') {
                $('body').addClass('offline')
            } else {
                $('body').removeClass('offline')
            }
            var li = $(this).closest('li')
                , index = $('section.story-list ul li').index(li)
                , feed = sent ? void 0 : feedObj;

            $('.story-item.active').removeClass('active');
            $(this).addClass('active');
            story.show(index, feed).then(function () {
                header.showStory();
            });
            sent = true;
        }
    });

    $('.story-image').on('error', function (e) {
      $(this).prop('src', config.missingImageRef.toURL());
    });
    setTimeout(function () {
			if (allowRefresh) {
				refresh.init();
			}
      resolve(200);
    }, 0);

    if (config.track && analytics) {
      analytics.trackEvent('Feed', 'Load', feedObj.title, 10);
    }

  })
}

$(document).on('access.refresh', function (e, obj) {
  show(obj, true);
});

module.exports = {
	show: show
};