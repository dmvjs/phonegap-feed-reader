var config = require('../config')
	, notify = require('../../util/notify')
	, access = require('../access')
	, header = require('./header')
	, storyList = require('./storyList')
	, doesFileExist = require('../../io/doesFileExist')
	, getFileContents = require('../../io/getFileContents')
	, primary = false;

(function init() {
	var menuFragment = $('<section/>', {
		addClass: 'menu'
	});

	config.menu.forEach(function (obj) {
		var feed = !!obj.feeds
		, list = $('<ul/>', {
				addClass: 'menu-items'
			})
		, title = $('<span/>', {
				addClass: 'title'
				, text: obj.title || ''
			})
		, sub = $('<span/>', {
				addClass: 'sub'
				, text: obj.sub || ''
			})
		, sectionHeader = $('<div/>', {
				addClass: 'section-header'
			}).append(title).append(sub);

		if (feed) {
			obj.feeds.forEach(function (el) {
				var label = $('<div/>', {
					addClass: 'label'
					, text: el.name
				})
				, sub = $('<div/>', {
					addClass: 'sub'
					, text: 'Not yet downloaded'
					, 'data-url': el.filename || el.url.split('/').pop().split('.').shift() + '.json'
				})
				, container = $('<div/>', {
						addClass: 'menu-item-box'
					}).append(label).append(sub)
				, box = $('<div/>', {
						addClass: el.required ? 'check required' : 'check'
					})
				, link = $('<a/>', {
					addClass: 'menu-link feed'
				})
				, hairline = $('<div/>', {
					addClass: 'hairline'
				})
				, item = $('<li/>', {
					addClass: 'menu-item'
				}).append(hairline).append(link.append(container).append(box))
				, filename = access.getFilenameFromFeed(el);

				if (el.required && !primary) {
					primary = item;
					item.addClass('active')
				}

				doesFileExist(filename).then(function () {
					getFileContents(filename).then(function (contents) {
						var obj = (JSON.parse(contents.target._result));
						update(filename, 'Updated: ' + obj.lastBuildDate);
						box.addClass('checked');
					})
				})

				list.append(item);
			})
		} else {
			obj.links.forEach(function (el) {
				var label = $('<div/>', {
					addClass: 'label link'
					, text: el.name
				})
				, container = $('<div/>', {
						addClass: 'menu-item-box'
					}).append(label)
				, link = $('<a/>', {
					addClass: 'menu-link link'
					, href: el.url
					, target: '_system'
				})
				, hairline = $('<div/>', {
					addClass: 'hairline'
				})
				, item = $('<li/>', {
					addClass: 'menu-item'
				}).append(hairline).append(link.append(container));

				list.append(item);
			})
		}

		menuFragment.append(sectionHeader).append(list);

	});

	$('section.menu').replaceWith(menuFragment);

	$('a.menu-link .check').on('click', function (e) {
		//download a feed
		var index = $('section.menu li').index($(this).closest('li'))
		e.stopPropagation();

		if ($(this).hasClass('checked') && $(this).hasClass('required') === false) {
			remove(index);
			if (config.debug && analytics) {
				analytics.trackEvent('Menu', 'Feed', 'Delete Feed');
			}
		} else {
			if (navigator.connection.type !== 'none') {
				get(index, true);
				if (config.debug && analytics) {
					analytics.trackEvent('Menu', 'Feed', 'Download Feed');
				}
			} else {
				notify.alert(config.connectionMessage);
			}
		}
	})

	$('a.menu-link.feed').on('click', function (e) {
		var $check = $(e.currentTarget).find('.check');
		e.preventDefault();
		if (navigator.connection.type !== 'none' || $check.hasClass('checked') || $check.hasClass('required')) {
			get($('section.menu li').index($(this).closest('li')));
			$('section.menu li.active').removeClass('active');
			$(e.currentTarget).closest('li').addClass('active');
		} else {
			notify.alert(config.connectionMessage);
		}
	})

	$('a.menu-link.link').on('click', function (e) {
		e.preventDefault();
		if (navigator.connection.type !== 'none') {
			var url = $(e.currentTarget).prop('href');
			window.open(encodeURI(url), '_blank', 'location=no, toolbar=yes');
			$('section.menu li.active').removeClass('active');
			$(e.currentTarget).closest('li').addClass('active');
			if (config.debug && analytics) {
				analytics.trackEvent('Menu', 'Link Click ', url);
			}
		} else {
			notify.alert(config.connectionMessage);
		}
	})

}());

function update(filename, date) {
	var items = $('section.menu .menu-item-box .sub[data-url="' + filename + '"]');
	items.text(date);
	items.closest('li').find('.check').removeClass('loading').addClass('checked');
}

function get(id, loadOnly) {
	var filename = access.getFilenameFromId(id);
	$('section.menu .menu-item-box .sub[data-url="' + filename + '"]').closest('li').find('.check').addClass('loading');

	access.get(id).then(function (contents) {
		var obj = (JSON.parse(contents.target._result));

		update(filename, 'Updated: ' + obj.lastBuildDate);
		if (!loadOnly) {
			storyList.show(obj).then(function () {
        header.showStoryList();
			});
		}
	}, function (error) {
		console.log(error)
		notify.alert('an error occured')
	});
}

function remove(id) {
	var filename = access.getFilenameFromId(id)
		, item = $('section.menu .menu-item-box .sub[data-url="' + filename + '"]').closest('li');

	access.removeFeed(id).then(function () {
		item.find('.check').removeClass('checked');
		item.find('.sub').text(config.menuMessage);
		if (item.hasClass('active')) {
			item.removeClass('active');
			primary.addClass('active');
			getFileContents(access.getFilenameFromId(0)).then(function (contents) {
				var obj = (JSON.parse(contents.target._result));
				storyList.show(obj);
			})
		}
	})
}

$(document).on('access.refresh', function (e, obj, filename) {
  update(filename, 'Updated: ' + obj.lastBuildDate);
})

module.exports = {
	update: update
	//, refresh: refresh
}