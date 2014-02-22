module.exports = (function () {
	var config = require('./config'),
		notify = require('./notify'),
		doesFileExist = require('./doesFileExist');

	$(function() {
		$('body').append($('<div/>', {
			'text': 'Check file'
			, 'css': {
				'height': '50px'
				, 'width': '100%'
				, 'background-color': '#F1F1F1'
				, 'text-align': 'center'
				, 'vertical-align': 'middle'
			},
			'click': function () {
				var url = config[0].url
				$.ajax(url)
					.done(function (res) {
						debugger
						$.when(doesFileExist(url.split('/').pop()))
							.done(function(){
								notify.y();
							})
							.fail(function(){
								notify.n();
							});
					})
					.error(function () {
						//must be offline, or bad url, or...
						doesFileExist('test.html');
					})
			}
		}))
	});
}())