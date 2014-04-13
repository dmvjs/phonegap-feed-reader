/*global $, require, module */
var story = require('./story');

$(document)
	.on('touchend', 'header .show-menu', function () {
		setTimeout(function () {
			$('header').addClass('stay');
			if ($('section.menu').hasClass('active')) {
				showStoryList();
			} else {
				showMenu();
			}
		}, 0);
	})
	.on('touchend', 'header .story .back', function () {
		setTimeout(function () {
			showStoryList();
		}, 0);
	});

addListeners();

function addListeners() {
  addListener('previous');
  addListener('next');
}

function removeListeners() {
  removeListener('previous');
  removeListener('next');
}

function removeListener(className) {
  if (className === 'previous' || className === 'next') {
    $(document).off('touchstart', 'header .story .btn-group .' + className);
  }
}

function addListener(className) {
  if (className === 'previous' || className === 'next') {
    $(document).on('touchstart', 'header .story .btn-group .' + className, function () {
      removeListeners();
      setTimeout(function () {
        story[className]();
        setTimeout(function () {
          addListeners();
        }, 350)
      }, 0);
    })
  }
}

function show(sel) {
	var sels = ['.menu', '.story', '.story-list']
		, $h = $('header')
		, $sel = $h.find(sel).stop(true);

	sels.splice(sels.indexOf(sel), 1);

	sels.forEach(function (el) {
		var $el = $h.find(el);

		$el.removeClass('active');
	});

  $sel.addClass('active');
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
};