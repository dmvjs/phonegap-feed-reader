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
	, missingImage: 'http://carnegieendowment.org/app-img-not-avail.png'
	, missingImageRef: void 0
	, menu: [{
		title: ''
		, sub: 'Read Offline'
		, feeds: [{
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson'
			, name: 'Latest Analysis'
			, filename: 'mobile-global.json'
			, type: 'json'
			, required: true
		}, {
			url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-top5.json.txt'
			, name: 'Most Popular'
			, filename: 'top5.json'
			, type: 'json'
		}]
	}, {
		title: 'Languages'
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
			, filename: 'russian-json.json'
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=zh'
			, name: '中文'
			, type: 'json'
			, filename: 'china-json.json'
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&lang=ar'
			, name: 'عربي'
			, dir: 'rtl'
			, type: 'json'
			, filename: 'arabic-json.json'
		}]
	}, {
		title: 'Global Centers'
		, feeds: [{
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=beijing'
			, name: 'Beijing'
			, type: 'json'
			, filename: 'beijing-json.json'
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=beirut'
			, name: 'Beirut'
			, type: 'json'
			, filename: 'beirut-json.json'
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=brussels'
			, name: 'Brussels'
			, type: 'json'
			, filename: 'brussels-json.json'
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=moscow'
			, name: 'Moscow'
			, type: 'json'
			, filename: 'moscow-json.json'
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson&center=india'
			, name: 'New Delhi'
			, type: 'json'
			, filename: 'newdelhi-json.json'
		}, {
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobalJson'
			, name: 'Washington D.C.'
			, filename: 'mobile-global.json'
			, type: 'json'
			, required: true
		}]
	}, {
		title: 'Blogs'
		, links: [{
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
		}, {
			url: 'http://carnegieendowment.org/infographics'
			, name: 'Infographics'
		}]
	}, {
		title: 'Explore'
		, links: [{
			url: 'http://carnegieendowment.org/resources/?fa=register'
			, name: 'Subscribe'
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