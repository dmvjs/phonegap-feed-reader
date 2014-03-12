var config = require('../config')
	, access = require('../access')
	, feedObj
	, index;

function show(i, feed) {
	var obj = feedObj = feed || feedObj
		, storyObj = obj.story[i]
		, image = storyObj.image ? config.fs + storyObj.image.split('/').pop() : config.missingImageRef.toURL()
		, rtl = obj.title ? obj.title.toLowerCase().indexOf('arabic') > -1 : false;

	index = i;

  html = 
	  '<div class="page">\
		  <div class="top-bar">' + storyObj.docType + '</div>\
		  <div class="story-title">' + storyObj.title + '</div>\
		  <img src="' + image + '" class="story-image"/>\
	  	<div class="story-meta">\
				<div class="story-author">' + storyObj.author + '</div>\
				<div class="story-date">' + storyObj.pubDate + '</div>\
			</div>\
			<div class="story-text">' + storyObj.description + '</div>\
		</div>';

	$('section.story').toggleClass('rtl', !!rtl).prop('dir', rtl ? 'rtl' : 'ltr').addClass('active').scrollTop(0).html(html);

	$('footer.story-footer .share').on('click', function () {
		setTimeout(function () {
			window.plugins.socialsharing.share('I\'m currently reading:',
      storyObj.title,
      storyObj.image || null,
      storyObj.link)
		}, 0)
	})

	$('section.story a').on('click', function (e) {
		//select a feed (download if needed)
		e.preventDefault();
		window.open(encodeURI($(e.currentTarget).prop('href')), '_blank', 'location=no, toolbar=yes');
	})

	$('.story-image').on('error', function (e) {
    $(this).prop('src', config.missingImageRef.toURL());
  })
}

function next() {
	if (index < feedObj.story.length - 1) {
		index += 1;
		showAndUpdate(index);
	}
}

function previous() {
	if (index > 0) {
		index -= 1;
		showAndUpdate(index);
	}
}

function showAndUpdate(index) {
	show(index);
	$('section.story-list ul li .story-item.active').removeClass('active'); 
	$('section.story-list ul li .story-item').eq(index).addClass('active'); 
	//storyList.update(index);
}

module.exports = {
	show: show
	, next: next
	, previous: previous
}