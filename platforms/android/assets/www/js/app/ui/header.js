var story = require('./story');

$(document)
	.on('click', 'header .show-menu', function () {
		$('header').addClass('stay');
		if ($('section.menu').hasClass('active')) {
			showStoryList();
		} else {
			showMenu();
		}
	})
	.on('click', 'header .story .back', showStoryList)
	.on('click', 'header .story .btn-group .previous', function () {
		story.previous();
	})
	.on('click', 'header .story .btn-group .next', function () {
		story.next();
	});

function show(sel) {
	var sels = ['.menu', '.story', '.story-list']
		, $h = $('header')
		, $sel = $h.find(sel).stop(true);

	sels.splice(sels.indexOf(sel), 1);

	sels.forEach(function (el, index) {
		var $el = $h.find(el);

		$el.stop(true).fadeOut('fast', function () {
			$el.removeClass('active')
		});
	});

	setTimeout(function () {
		$sel.addClass('active').fadeIn('fast')
	}, 300)
}

function showStoryList() {
	$('section.story').removeClass('active');
	$('section.story-list').addClass('active');
	$('section.menu').removeClass('active');
	$('footer.story-footer').removeClass('active');
	show('.story-list');
	story.hide();
}

function showMenu() {
	$('section.menu').addClass('active');
	show('.menu');
}

function showStory() {
	$('header').removeClass('stay');
	$('section.menu').removeClass('active');
	$('footer.story-footer').addClass('active');
	$('section.story').addClass('active');
	show('.story');
}

module.exports = {
	showStoryList: showStoryList
	, showMenu: showMenu
	, showStory: showStory
}