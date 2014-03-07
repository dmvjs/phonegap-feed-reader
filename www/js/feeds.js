module.exports = (function () {
	var config = require('./app/config')
		, notify = require('./util/notify')
		, downloadExternalFile = require('./io/downloadExternalFile')
		, access = require('./app/access');

	// make sure the missing image file is available
	downloadExternalFile('http://m.ceip.org/img/appsupport/image-unavailable_605x328.png');

	$(function() {
		$('body').append($('<div/>', {
			'text': 'Download feed'
			, 'css': {
				'height': '50px'
				, 'width': '100%'
				, 'background-color': '#F1F1F1'
				, 'text-align': 'center'
				, 'line-height': '50px'
				, 'font-family': 'sans-serif'
			},
			'click': function () {
				access.get(config[0].url);
			}
		}))
	});
}())