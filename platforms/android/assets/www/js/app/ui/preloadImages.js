module.exports = (function () {

	var images = [
		'footer-story-share-active.png'
		, 'footer-story-text-active.png'
		, 'header-btn-menu-menu-active.png'
		, 'header-btn-story-arrow-active.png'
		, 'header-btn-story-back-active.png'
		, 'header-btn-story-menu-active.png'
		, 'header-story.png'
		, 'checked.png'
		, 'unchecked.png'
		, 'header-offline.png'
	].forEach(function (element) {
		var img = new Image();
		img.src = './img/' + element;
	})
	
}());