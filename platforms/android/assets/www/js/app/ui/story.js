/*global module, require, $*/

var config = require('../config')
	, access = require('../access')
	, notify = require('../../util/notify')
	, share = ['ios', 'android', 'win32nt'].indexOf(device.platform.toLowerCase()) > -1
	, browser = ['ios', 'android', 'blackberry 10', 'win32nt'].indexOf(device.platform.toLowerCase()) > -1
	, $story = $('section.story')
	, slider = document.getElementById('text-resize-input')
	, feedObj
	, index;

if (share && plugins && plugins.socialsharing) {
  $(document)
		.on('touchstart', 'footer.story-footer .share', function (e) {
			$(e.currentTarget).addClass('active');
		})
		.on('touchend', 'footer.story-footer .share', function (e) {
			var ui = $(e.currentTarget);
			if ($(e.currentTarget).hasClass('disabled') === false) {
				setTimeout(function () {
					hideTextResize();
					if (typeof index !== 'undefined' && feedObj && navigator.connection.type !== 'none') {
						window.plugins.socialsharing.share(
								'I\'m currently reading ' + (feedObj.story ? feedObj.story[index].title : feedObj.item[index].title),
							(feedObj.story ? feedObj.story[index].title : feedObj.item[index].title),
								(feedObj.story ? (feedObj.story[index].image) : (feedObj.item[index].image)) || config.missingImage,
							encodeURI(feedObj.story ? feedObj.story[index].link : feedObj.item[index].link)
						);
						if (config.track && analytics) {
							analytics.trackEvent('Story', 'Share', 'Share Clicked', 10);
						}
					} else {
						if (navigator.connection.type === 'none') {
							notify.alert(config.connectionMessage);
						} else {
							notify.alert('Sorry, a problem occurred while trying to share this post')
						}
					}
					ui.removeClass('active');
				}, 0)
			} else {
				ui.removeClass('active');
			}
		})
} else {
  //remove footer & make story window taller, sharing not supported
  $('footer.story-footer button.share').addClass('disabled');
}

if (browser) {
  $(document).on('click', 'section.story .current a', function (e) {
    var href = $(e.currentTarget).attr('href');

    if (href.substr(0, 1) === '#') {
      if ($('.current').find(href)) {
        if (config.track && analytics) {
          analytics.trackEvent('Story', 'Link', 'Page Anchor Clicked', 10);
        }
	      e.preventDefault()
	      $('.current').scrollTop($(href).position().top);
      } else {
        e.preventDefault();
        return false;
      }
    } else if (navigator.connection.type !== 'none') {
      e.preventDefault();
      if (href.substr(0, 6) === 'mailto') {
        window.open(encodeURI(href), '_system', '');
        if (config.track && analytics) {
          analytics.trackEvent('Story', 'Link', 'Email Link Clicked', 10);
        }
      } else {
        window.open(encodeURI(href), '_blank', 'location=no,toolbar=yes,enableViewportScale=yes');
        if (config.track && analytics) {
          analytics.trackEvent('Story', 'Link', 'External Link Clicked', 10);
        }
      }
    } else {
      e.preventDefault();
      notify.alert(config.connectionMessage);
    }
  })
} else {
  // handle systems with no inapp browser, or don't...
}

$(document)
	.on('touchstart', 'footer.story-footer .text', function (e) {
		$(e.currentTarget).addClass('active');
	})
	.on('touchend', 'footer.story-footer .text', function (e) {
		var ui = $(e.currentTarget);
		setTimeout(function () {
			$('.text-resize').toggleClass('active');
			if (config.track && analytics) {
				analytics.trackEvent('Story', 'UI', 'Text Resize Opened', 10);
			}
			ui.removeClass('active');
		}, 0)
	});

function hideTextResize() {
  $('.text-resize').removeClass('active');
}

slider.onchange = function () {
  setTimeout(function () {
    var val = parseFloat(slider.value)
      , value = (slider.value - slider.min) / (slider.max - slider.min);

    config.storyFontSize = val;

    slider.style.backgroundImage = [
      '-webkit-gradient(',
      'linear, ',
      'left top, ',
      'right top, ',
        'color-stop(' + value + ', #007aff), ',
        'color-stop(' + value + ', #b8b7b8)',
      ')'
    ].join('');
    $story.css('font-size', val + 'em');
  }, 0)
};

function show(i, feed) {
  return new Promise(function (resolve, reject) {
    var obj = feedObj = feed || feedObj
      , storyObj = obj.story ? obj.story[i] : obj.item[i]
      , rtl = /[\u0600-\u06FF\u0750-\u077F]/.test(feedObj.title) || feedObj.title.toLowerCase().indexOf('arabic') > -1
      , current = $('<div/>', {
        addClass: 'current'
      });

    index = i;
    $('section.story').toggleClass('rtl', !!rtl).prop('dir', rtl ? 'rtl' : 'ltr');

    if (config.track && analytics) {
      track(obj.story ? obj.story[i].title : obj.item[i].title);
    }

    createPage(storyObj).then(function (page) {
      current.append(page);
      $('section.story .current').replaceWith(current);

      createPreviousAndNext();

      setTimeout(function () {
        resolve(200)
      }, 0)
    }, reject)
  })
}

function createPrevious() {
  var previous = $('<div/>', {
      addClass: 'previous'
    })
    , $previous = $('section.story .previous');

  if (notFirst()) {
    createPage(feedObj.story ? feedObj.story[index - 1] : feedObj.item[index - 1]).then(function (pageP) {
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
    createPage(feedObj.story ? feedObj.story[index + 1] : feedObj.item[index + 1]).then(function (pageN) {
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
        addClass: 'top-bar', html: storyObj.docType || ''
      })
      , storyTitle = $('<div/>', {
        addClass: 'story-title', text: storyObj.title
      })
      , storyImage = $('<img>', {
        src: image, addClass: 'story-image'
      })
      , storyAuthor = $('<div/>', {
        addClass: 'story-author', text: storyObj.author || ''
      })
      , storyDate = $('<div/>', {
        addClass: 'story-date', text: storyObj.publishDate || storyObj.pubDate || ''
      })
      , storyMeta = $('<div/>', {
        addClass: 'story-meta'
      }).append(storyTitle).append(storyAuthor).append(storyDate)
      , storyTop = $('<div/>', {
        addClass: 'story-top'
      }).append(storyImage).append(storyMeta)
      , storyText = $('<div/>', {
        addClass: 'story-text', html: storyObj.description
      })
      , page = $('<div/>', {
        addClass: 'page'
      }).append(topBar).append(storyTop).append(storyText);

    storyImage.on('error', function (e) {
      $(this).prop('src', config.missingImageRef.toURL());
    });

    setTimeout(function () {
      resolve(page)
    }, 0)
  })
}

function notLast(id) {
  var length = feedObj.story ? feedObj.story.length : feedObj.item.length;
  return id || index < length - 1;
}

function notFirst(id) {
  return id || index > 0;
}

function next() {
  if (notLast()) {
    index += 1;
    var c = $('section.story .current')
      , n = $('section.story .next');

    $('section.story .previous').remove();
    c.removeClass('current').addClass('previous');
    n.removeClass('next').addClass('current');
    update();
    createNext();
    track(feedObj.story ? feedObj.story[index].title : feedObj.item[index].title);
  }
}

function track(title) {
  if (config.track && analytics) {
    analytics.trackEvent('Story', 'Load', title, 10);
  }
}

function previous() {
  if (notFirst()) {
    index -= 1;
    var c = $('section.story .current')
      , p = $('section.story .previous');

    $('section.story .next').remove();
    c.removeClass('current').addClass('next');
    p.removeClass('previous').addClass('current');
    update();
    createPrevious();
    track(feedObj.story ? feedObj.story[index].title : feedObj.item[index].title);
  }
}

function update() {
  hideTextResize();
  $('section.story-list ul li .story-item.active').removeClass('active');
  $('section.story-list ul li .story-item').eq(index).addClass('active');

  setTimeout(function () {
    $('section.story .next').scrollTop(0);
    $('section.story .previous').scrollTop(0);
      if (index === 0) {
          $('.story-list').scrollTop(0)
      } else {
          $('.story-list').scrollTop(
              parseInt($('.story-list ul li').eq(0).height(), 10) +
              ((index - 1) * parseInt($('.story-list ul li').eq(1).height(), 10))
          )
      }
  }, 350)
}

function showAndUpdate(index) {
  show(index, null, true).then(function () {
    update();
  });
}

module.exports = {
  show: show, next: next, previous: previous, hide: hideTextResize
};