module.exports = (function () {
	var config = require('./config')
		, notify = require('./util/notify')
		, doesFileExist = require('./io/doesFileExist')
		, createFileWithContents = require('./io/createFileWithContents')
		, getFileContents = require('./io/getFileContents')
		, downloadExternalFile = require('./io/downloadExternalFile')
		, toJson = require('./xmlToJson');

	$(function() {
		$('body').append($('<div/>', {
			'text': 'Does ' + config[0].url.split('/').pop().split('.').shift() + '.json' + ' exist?'
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
				downloadExternalFile('http://carnegieendowment.org/images/article_images/Wendy_Sherman605.jpg', 'Wendy_Sherman605.jpg');
				/*$.ajax({
						url: url,
						dataType: 'xml'
					})
					.then(function (res) {
						var obj = toJson(res);
						checkFileWithPromise(url.split('/').pop().split('.').shift() + '.json', JSON.stringify(obj))
					}, function () {
						//must be offline, or bad url, or...
						doesFileExist('test.html');
					})*/
			}
		}))
	});

	function checkFileWithPromise(filename, res) {
		$.when(doesFileExist(filename))
			.then(function() {
					readFileWithPromise(filename);
				}, function(err) {
					writeFileWithPromise(filename, res)
				});
	}

	function writeFileWithPromise(filename, contents) {
		$.when(createFileWithContents(filename, contents))
			.then(function() {
					readFileWithPromise(filename);
				}, function(err) {
					notify.n('from writeFileWithPromise');
				});
	}

	function readFileWithPromise(filename) {
		$.when(getFileContents(filename))
			.then(function(res) {
					console.log(JSON.parse(res));
					notify.y('from readFileWithPromise');
				}, function(err) {
					notify.n('from readFileWithPromise');
				});
	}
}())