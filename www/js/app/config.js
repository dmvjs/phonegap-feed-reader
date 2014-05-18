/*global module, require*/

module.exports = {
	fs: void 0
	, appName: 'Carnegie'
	, track: true
	, trackId: 'UA-31877-29'
	, folder: 'com.ceip.carnegie'
	, storyFontSize: 1.0
	, connectionMessage: 'No network connection detected'
	, menuMessage: 'Not yet downloaded'
	, missingImage: 'http://m.ceip.org/img/appsupport/image-unavailable_605x328.png'
	, missingImageRef: void 0
	, menu: [{
		title: 'Analysis'
		, sub: 'Read Offline'
		, feeds: [{
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson'
			, name: 'Latest Analysis'
			, filename: 'mobile-global.json'
			, type: 'json'
			, required: true
		}, {
			url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-Top5.xml'
			, name: 'Most Popular'
		}]
	}, {
		title: 'Languages'
		, sub: 'Read Offline'
		, feeds: [{
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson'
			, name: 'English'
			, filename: 'mobile-global.json'
			, type: 'json'
			, required: true
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=ru'
			, name: 'Русский'
			, type: 'json'
			, filename: 'russian-json-test.json'
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=zh'
			, name: '中文'
			, type: 'json'
			, filename: 'china-json-test.json'
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=ar'
			, name: 'عربي'
			, dir: 'rtl'
			, type: 'json'
			, filename: 'arabic-json-test.json'
		}]
	}, {
		title: 'Global Centers'
		, sub: 'Read Offline'
		, feeds: [{
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=beijing'
			, name: 'Beijing'
			, type: 'json'
			, filename: 'beijing-json-test.json'
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=beirut'
			, name: 'Beirut'
			, type: 'json'
			, filename: 'beirut-json-test.json'
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=brussels'
			, name: 'Brussels'
			, type: 'json'
			, filename: 'brussels-json-test.json'
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=moscow'
			, name: 'Moscow'
			, type: 'json'
			, filename: 'moscow-json-test.json'
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson'
			, name: 'Washington D.C.'
			, filename: 'mobile-global.json'
			, type: 'json'
			, required: true
		}]
	}, {
		title: 'Blogs'
		, sub: 'From m.ceip.org'
		, links: [{
			url: 'http://carnegie.ru/eurasiaoutlook/'
			, name: 'Eurasia Outlook'
		}, {
			url: 'http://carnegieendowment.org/sada/'
			, name: 'Sada'
		}, {
			url: 'http://carnegieeurope.eu/strategiceurope/'
			, name: 'Strategic Europe'
		}, {
			url: 'http://carnegieendowment.org/syriaincrisis/'
			, name: 'Syria in Crisis'
		}]
	}, {
		title: 'Global Resources'
		, links: [{
			url: 'http://carnegieendowment.org/topic/'
			, name: 'Issues'
		}, {
			url: 'http://carnegieendowment.org/regions/'
			, name: 'Regions'
		}, {
			url: 'http://carnegieendowment.org/experts/'
			, name: 'Experts'
		}, {
			url: 'http://carnegieendowment.org/publications/'
			, name: 'Publications'
		}, {
			url: 'http://carnegieendowment.org/events/'
			, name: 'Events'
		}, {
			url: 'http://carnegieendowment.org/programs/'
			, name: 'Programs'
		}, {
			url: 'http://carnegieendowment.org/video/'
			, name: 'Carnegie Video'
		}]
	}, {
		title: 'Explore'
		, links: [{
			url: 'http://carnegieendowment.org/resources/?fa=register'
			, name: 'Stay in the Know'
		}, {
			url: 'http://carnegieendowment.org/about/'
			, name: 'About Us'
		}, {
			url: 'http://carnegieendowment.org/about/development/'
			, name: 'Support Carnegie'
		}, {
			url: 'http://carnegieendowment.org/about/?fa=contact'
			, name: 'Help Desk'
		}, {
			url: 'http://carnegieendowment.org/about/index.cfm?fa=privacy'
			, name: 'Privacy Statement'
		}]
	}
	]
};