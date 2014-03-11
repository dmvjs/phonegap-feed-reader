module.exports = (function () {
	$('.show-menu').on('touchstart', function () {
		$('section.menu').toggleClass('active');
		$('section.story-list').toggleClass('active');
	})
}())