var config = require('../config')
  , header = require('./header')
  , story = require('./story');

function show(feedObj) {
	var obj = feedObj.story
		, html = '<div class="top-bar">Updated: ' + feedObj.lastBuildDate + '</div>'
    , rtl = feedObj.title ? feedObj.title.toLowerCase().indexOf('arabic') > -1 : false
    , sent = false;

  obj.forEach(function (element) {
    var image = element.image ? config.fs + element.image.split('/').pop() : config.missingImageRef.toURL();
    html += 
    '<li>\
    	<div class="story-item">\
        <div class="hairline"></div>\
    		<img src="' + image + '" class="story-image"/>\
  			<div class="story-text">\
  				<div class="story-title">' + element.title + '</div>\
  				<div class="story-author">' + element.author + '</div>\
  				<div class="story-date">' + element.pubDate + '</div>\
  			</div>\
  		</div>\
  	</li>';
  });

  $('section.story-list').toggleClass('rtl', rtl).prop('dir', rtl ? 'rtl' : 'ltr').scrollTop(0);

  $('section.story-list ul').html(html);

  $('.story-item').on('click', function (e) {
    var li = $(this).closest('li')
      , index = $('section.story-list ul li').index(li)
      , feed = sent ? void 0 : feedObj;
			$('.story-item.active').removeClass('active'); 
			$(this).addClass('active'); 
      story.show(index, feed);
      sent = true;
      header.showStory() 
  });

  $('.story-image').on('error', function (e) {
    $(this).prop('src', config.missingImageRef.toURL());
  })
}

module.exports = {
	show: show
}