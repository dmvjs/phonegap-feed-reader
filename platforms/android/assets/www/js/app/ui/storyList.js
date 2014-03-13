var config = require('../config')
  , header = require('./header')
  , story = require('./story');

function show(feedObj) {
	return new Promise(function(resolve, reject) {
    var obj = feedObj.story
      , rtl = feedObj.title ? feedObj.title.toLowerCase().indexOf('arabic') > -1 : false
      , topBar = $('<div/>', {
        addClass: 'top-bar'
        , text: 'Updated: ' + feedObj.lastBuildDate
      })
      , ul = $('<ul/>', {})
      , section = $('<section/>', {
        addClass: 'story-list'
        , dir: rtl ? 'rtl' : 'ltr'
      }).append(topBar).append(ul).toggleClass('rtl', rtl)
      , sent = false;

    obj.forEach(function (element) {
      var image = element.image ? config.fs + element.image.split('/').pop() : config.missingImageRef.toURL()
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
        })
        sent = true;
    });

    $('.story-image').on('error', function (e) {
      $(this).prop('src', config.missingImageRef.toURL());
    })
    setTimeout(function () {
      resolve(200);
    }, 0)
  })
};

module.exports = {
	show: show
}