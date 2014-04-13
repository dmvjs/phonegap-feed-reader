/*global require, module, $*/
var config = require('../config')
  , header = require('./header')
  , story = require('./story')
  , refresh = require('./refresh');

function show(feedObj, forceActive) {
	return new Promise(function(resolve, reject) {
    var obj = feedObj.story
      , rtl = feedObj.title ? feedObj.title.toLowerCase().indexOf('arabic') > -1 : false
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
        , css: {
          '-webkit-user-select': 'none'
          , '-webkit-user-drag': 'none'
          , '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)'
          , '-webkit-transform': 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)'
        }
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
          , text: element.pubDate
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
        , li = $('<li/>', {}).append(storyItem)

        ul.append(li);
    });

    $('.container section.story-list').replaceWith(section)

    $('.story-item').on('click', function (e) {
      var li = $(this).closest('li')
        , index = $('section.story-list ul li').index(li)
        , feed = sent ? void 0 : feedObj;

        $('.story-item.active').removeClass('active'); 
        $(this).addClass('active'); 
        story.show(index, feed).then(function () {
          header.showStory();
        });
        sent = true;
    });

    $('.story-image').on('error', function (e) {
      $(this).prop('src', config.missingImageRef.toURL());
    });
    setTimeout(function () {
      refresh.init();
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