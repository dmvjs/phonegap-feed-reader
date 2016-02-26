module.exports = (function () {
	var config = require('./app/config')
		, notify = require('./util/notify')
		, downloadExternalFile = require('./io/downloadExternalFile')
		, access = require('./app/access');

	// make sure the missing image file is available
	downloadExternalFile('http://m.ceip.org/img/appsupport/image-unavailable_605x328.png');

	$(function() {
		$('body')
		.append($('<div/>', {
			'text': 'Download feed'
			, 'addClass': 'test-button'
			, 'click': function () {
				access.get(0);
			}
		}))
		.append($('<div/>', {
			'text': 'Delete orphan images'
			, 'addClass': 'test-button'
			, 'click': function () {
				access.removeImages();
			}
		}))
		.append($('<div/>', {
			'text': 'Delete feed'
			, 'addClass': 'test-button'
			, 'click': function () {
				access.remove(0);
			}
		}))
	});
}())