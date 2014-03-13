var config = require('../config')
	, access = require('../access')
	, feedObj
	, index;

$(document).on('click', 'footer.story-footer .share', function () {
	if (index && feedObj) {
			window.plugins.socialsharing.share(
				'I\'m currently reading ' + feedObj.story[index].title,
		    feedObj.story[index].title,
		    feedObj.story[index].image || null,
		    encodeURI(feedObj.story[index].link)
	    )
	} else {
		notify.alert('Sorry, a problem occured trying to share this post')
	}
})

$(document).on('click', 'section.story a', function (e) {
	e.preventDefault();
	window.open(encodeURI($(e.currentTarget).prop('href')), '_blank', 'location=no, toolbar=yes');
})

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

		createPage(storyObj).then(function (page) {
			current.append(page);
			$('section.story .current').replaceWith(current);

			createPrevAndNext();
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
			$previous.replaceWith(previous);
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

function createPrevAndNext() {
	createPrevious();
	createNext();
}

function createPage(storyObj) {
	return new Promise(function (resolve, reject) {
		var image = storyObj.image ? config.fs + storyObj.image.split('/').pop() : config.missingImageRef.toURL()
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

		c.removeClass('current').addClass('previous');
		n.removeClass('next').addClass('current');
		createNext();
		update();
		//showAndUpdate(index);
	}
}

function previous() {
	if (notFirst()) {
		index -= 1;
		var c = $('section.story .current')
			, p = $('section.story .previous')
			, n = $('section.story .next').remove();

		c.removeClass('current').addClass('next');
		p.removeClass('previous').addClass('current');
		createPrevious();
		update();
	}
}

function update() {
	$('section.story-list ul li .story-item.active').removeClass('active'); 
	$('section.story-list ul li .story-item').eq(index).addClass('active');

	setTimeout(function () {
		//$('section.story-list').scrollTop($('section.story-list .story-item.active').position().top);
		$('section.story .next').scrollTop(0);
		$('section.story .previous').scrollTop(0);
	}, 350)
}

function showAndUpdate(index) {
	show(index, null, true).then(function() {
		update();
	});
	//storyList.update(index);
}

module.exports = {
	show: show
	, next: next
	, previous: previous
}