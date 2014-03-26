var config = require('../config')
	, access = require('../access')
	, notify = require('../../util/notify')
	, share = ['ios', 'android', 'win32nt'].indexOf(device.platform.toLowerCase()) > -1
	, browser = ['ios', 'android', 'blackberry 10', 'win32nt'].indexOf(device.platform.toLowerCase()) > -1
	, feedObj
	, index;

if (share && plugins && plugins.socialsharing) {
	$(document).on('click', 'footer.story-footer .share', function () {
		hideTextResize();
		if (typeof index !== 'undefined' && feedObj) {
				setTimeout(function () {
					window.plugins.socialsharing.share(
						'I\'m currently reading ' + feedObj.story[index].title,
				    feedObj.story[index].title,
				    feedObj.story[index].image || config.missingImage,
				    encodeURI(feedObj.story[index].link)
			    )
			    if (config.track && analytics) {
						analytics.trackEvent('Story', 'Share', 'Share Clicked');
					}
				}, 0)
		} else {
			notify.alert('Sorry, a problem occured trying to share this post')
		}
	})
} else {
	//remove footer & make story window taller, sharing not supported
	$('section.story .share').addClass('disabled');
}

if (browser) {
	$(document).on('click', 'section.story a', function (e) {
		var href = $(e.currentTarget).attr('href')
			, selector = '';
		if (href.substr(0, 1) === '#') {
			if (config.track && analytics) {
				analytics.trackEvent('Story', 'Link', 'Page Anchor Clicked');
			}
			return
		} else if (navigator.connection.type !== 'none') {
			if (href.substr(0, 6) === 'mailto') {
				e.preventDefault();
				window.open(encodeURI(href), '_system', '');
				if (config.track && analytics) {
					analytics.trackEvent('Story', 'Link', 'Email Link Clicked');
				}
			} else {
				e.preventDefault();
				window.open(encodeURI(href), '_blank', 'location=no, toolbar=yes');
				if (config.track && analytics) {
					analytics.trackEvent('Story', 'Link', 'External Link Clicked');
				}
			}
		} else {
			notify.alert(config.connectionMessage);
		}
	})
} else {
	// handle systems with no inapp browser, or don't...
}

$(document).on('click', 'footer.story-footer .text', function () {
	$('.text-resize').toggleClass('active');
	if (config.track && analytics) {
		analytics.trackEvent('Story', 'UI', 'Text Resize Opened');
	}
});

function hideTextResize() {
	$('.text-resize').removeClass('active');
}

var slider = document.getElementById('text-resize-input');
slider.onchange = function () {
	var val = parseFloat(slider.value, 10)
		, value = (slider.value - slider.min)/(slider.max - slider.min)

	config.storyFontSize = val;

	if (config.track && analytics) {
		analytics.trackEvent('Story', 'Share', 'Text Resize Event');
	}

	slider.style.backgroundImage = [
		'-webkit-gradient(',
		'linear, ',
		'left top, ',
		'right top, ',
		'color-stop(' + value + ', #007aff), ',
		'color-stop(' + value + ', #b8b7b8)',
		')'
	].join('');

	setTimeout(function () {
		$('section.story').css('font-size', val + 'em');
	}, 0)
};

function show(i, feed) {
	return new Promise(function (resolve, reject) {
		var obj = feedObj = feed || feedObj
			, storyObj = obj.story[i]
			, rtl = obj.title ? obj.title.toLowerCase().indexOf('arabic') > -1 : false
			, current = $('<div/>', {
					addClass: 'current'
				});

		index = i;
		$('section.story').toggleClass('rtl', !!rtl).prop('dir', rtl ? 'rtl' : 'ltr');

		if (config.track && analytics) {
			track(obj.story[i].title);
		}

		createPage(storyObj).then(function (page) {
			current.append(page);
			$('section.story .current').replaceWith(current);

			createPreviousAndNext();

		  setTimeout(function () {
		  	resolve(200)
		  }, 0)
		})
	})
}

function createPrevious() {
	var previous = $('<div/>', {
				addClass: 'previous'
			})
		, $previous = $('section.story .previous');

	if (notFirst()) {
		createPage(feedObj.story[index - 1]).then(function (pageP) {
			previous.append(pageP);
			if ($previous.length) {
				$previous.replaceWith(previous);
			} else {
				$('section.story').append(previous);
			}
		})
	} else {
		$previous.empty()
	}
}

function createNext() {
	var next = $('<div/>', {
				addClass: 'next'
			})
		, $next = $('section.story .next');

	if (notLast()) {
		createPage(feedObj.story[index + 1]).then(function (pageN) {
			next.append(pageN);
			if ($next.length) {
				$next.replaceWith(next);
			} else {
				$('section.story').append(next);
			}
		})
	} else {
		$next.empty()
	}
}

function createPreviousAndNext() {
	createPrevious();
	createNext();
}

function createPage(storyObj) {
	return new Promise(function (resolve, reject) {
		var fs = config.fs.toURL()
			, path = fs + (fs.substr(-1) === '/' ? '' : '/')
			, image = storyObj.image ? path + storyObj.image.split('/').pop() : config.missingImageRef.toURL()
			, topBar = $('<div/>', {
				addClass: 'top-bar'
				, text: storyObj.docType
			})
			, storyTitle = $('<div/>', {
				addClass: 'story-title'
				, text: storyObj.title
			})
			, storyImage = $('<img>', {
				src: image
				, addClass: 'story-image'
			})
			, storyAuthor = $('<div/>', {
				addClass: 'story-author'
				, text: storyObj.author
			})
			, storyDate = $('<div/>', {
				addClass: 'story-date'
				, text: storyObj.pubDate
			})
			, storyMeta = $('<div/>', {
				addClass: 'story-meta'
			}).append(storyAuthor).append(storyDate)
			, storyText = $('<div/>', {
				addClass: 'story-text'
				, html: storyObj.description
			})
			, page = $('<div/>', {
				addClass: 'page'
			}).append(topBar).append(storyTitle).append(storyImage).append(storyMeta).append(storyText);

		storyImage.on('error', function (e) {
	    $(this).prop('src', config.missingImageRef.toURL());
	  })

		setTimeout(function () {
			resolve(page)
		}, 0)
	})
}

function notLast(id) {
	return id || index < feedObj.story.length - 1;
}

function notFirst(id) {
	return id || index > 0;
}

function next() {
	if (notLast()) {
		index += 1;
		var c = $('section.story .current')
			, n = $('section.story .next')
			, p = $('section.story .previous').remove();

		track(feedObj.story[index].title);

		c.removeClass('current').addClass('previous');
		n.removeClass('next').addClass('current');
		createNext();
		update();
	}
}

function track(title) {
	if (config.track && analytics) {
		analytics.trackEvent('Story', 'Load', title);
	}
}

function previous() {
	if (notFirst()) {
		index -= 1;
		var c = $('section.story .current')
			, p = $('section.story .previous')
			, n = $('section.story .next').remove();

		track(feedObj.story[index].title);

		c.removeClass('current').addClass('next');
		p.removeClass('previous').addClass('current');
		createPrevious();
		update();
	}
}

function update() {
	hideTextResize();
	$('section.story-list ul li .story-item.active').removeClass('active'); 
	$('section.story-list ul li .story-item').eq(index).addClass('active');

	setTimeout(function () {
		$('section.story .next').scrollTop(0);
		$('section.story .previous').scrollTop(0);
	}, 350)
}

function showAndUpdate(index) {
	show(index, null, true).then(function() {
		update();
	});
}

module.exports = {
	show: show
	, next: next
	, previous: previous
	, hide: hideTextResize
}