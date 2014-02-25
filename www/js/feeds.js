module.exports = (function () {
	var config = require('./config')
		, notify = require('./util/notify')
		, doesFileExist = require('./io/doesFileExist')
		, createFileWithContents = require('./io/createFileWithContents')
		, getFileContents = require('./io/getFileContents');

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
				$.ajax({
						url: url,
						dataType: 'text'
					})
					.done(function (res) {
						checkFileWithPromise(url.split('/').pop(), res)
					})
					.error(function () {
						//must be offline, or bad url, or...
						doesFileExist('test.html');
					})
			}
		}))
	});

	function checkFileWithPromise(filename, res) {
		$.when(doesFileExist(filename))
			.done(function(){
				//notify.y('from checkFileWithPromise');
				//writeFileWithPromise(filename, 'ZZSUPERCALI')
				readFileWithPromise(filename);
			})
			.fail(function(){
				writeFileWithPromise(filename, res)
				//notify.n();
			});
	}

	function writeFileWithPromise(filename, contents) {
		$.when(createFileWithContents(filename, contents))
			.done(function(){
				//notify.y('from writeFileWithPromise');
				readFileWithPromise(filename);
			})
			.fail(function(){
				notify.n('from writeFileWithPromise');
			});
	}

	function readFileWithPromise(filename) {
		$.when(getFileContents(filename))
			.done(function(res){
				console.log(res)
				notify.y('from readFileWithPromise');
			})
			.fail(function(){
				notify.n('from readFileWithPromise');
			});
	}
}())