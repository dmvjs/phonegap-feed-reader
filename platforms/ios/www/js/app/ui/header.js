var story = require('./story');

$('header .show-menu').on('touchstart', function () {
	if ($('section.story-list').hasClass('active')) {
		showMenu();
	} else {
		showStoryList();
	}
})

$('header .story .back').on('touchstart', showStoryList);

$('header .story .btn-group .previous').on('touchstart', function () {
	story.previous();
})

$('header .story .btn-group .next').on('touchstart', function () {
	story.next();
})

function showStoryList() {
	setTimeout(function () {
		$('header .story-list').addClass('active');
		$('header .menu').removeClass('active');
		$('header .story').removeClass('active');
	}, 400);
	$('section.story').removeClass('active');
	$('section.story-list').addClass('active');
	$('section.menu').removeClass('active');
	$('footer.story-footer').removeClass('active');
}

function showMenu() {
	setTimeout(function () {
		$('header .story-list').removeClass('active');
		$('header .menu').addClass('active');
		$('section.story-list').removeClass('active');
	}, 550)
	$('section.menu').addClass('active');
}

function showStory() {
	setTimeout(function () {
		$('header .story-list').removeClass('active');
		$('header .story').addClass('active');
		$('section.story-list').removeClass('active');
	}, 400)
	$('section.menu').removeClass('active');
	$('footer.story-footer').addClass('active');
	$('section.story').addClass('active');
}

module.exports = {
	showStoryList: showStoryList
	, showMenu: showMenu
	, showStory: showStory
}