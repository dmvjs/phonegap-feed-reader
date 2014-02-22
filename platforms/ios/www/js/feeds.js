module.exports = (function () {
	var config = require('./config')
		, notify = require('./notify')
		, doesFileExist = require('./doesFileExist')
		, createFileWithContents = require('./createFileWithContents');

	$(function() {
		$('body').append($('<div/>', {
			'text': 'Does ' + config[0].url.split('/').pop() + ' exist?'
			, 'css': {
				'height': '50px'
				, 'width': '100%'
				, 'background-color': '#F1F1F1'
				, 'text-align': 'center'
				, 'line-height': '50px'
				, 'font-family': 'sans-serif'
			},
			'click': function () {
				var url = config[0].url
				$.ajax(url)
					.done(function (res) {
						checkFileWithPromise(url.split('/').pop())
					})
					.error(function () {
						//must be offline, or bad url, or...
						doesFileExist('test.html');
					})
			}
		}))
	});

	function checkFileWithPromise(filename) {
		$.when(doesFileExist(filename))
			.done(function(){
				notify.y('from checkFileWithPromise');
				//writeFileWithPromise(filename, 'ZZSUPERCALI')
			})
			.fail(function(){
				writeFileWithPromise(filename, 'ZZSUPERCALI')
				//notify.n();
			});
	}

	function writeFileWithPromise(filename, contents) {
		$.when(createFileWithContents(filename, contents))
			.done(function(){
				notify.y('from writeFileWithPromise');
			})
			.fail(function(){
				notify.n('from writeFileWithPromise');
			});
	}
}())