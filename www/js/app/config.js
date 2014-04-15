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
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-english-dc.xml'
				, name: 'Latest Analysis'
				, required: true
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-Top5.xml'
				, name: 'Most Popular'
			}, {
        url: 'http://carnegieendowment.org/rss/solr/?fa=AppGlobal'
        , name: 'Comment Test'
        , filename: 'comment-test.json'
      }]
		}, {
			title: 'Languages'
			, sub: 'Read Offline'
			, feeds: [{
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-english.xml'
				, name: 'English'
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-russian.xml'
				, name: 'Русский'
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-chinese.xml'
				, name: '中文'
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-arabic.xml'
				, name: 'عربي'
				, dir: 'rtl'
			}]
		}, {
			title: 'Global Centers'
			, sub: 'Read Offline'
			, feeds: [{
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-beijing.xml'
				, name: 'Beijing'
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-beirut.xml'
				, name: 'Beirut'
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-brussels.xml'
				, name: 'Brussels'
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-moscow.xml'
				, name: 'Moscow'
			}, {
				url: 'http://carnegieendowment.org/rss/feeds/mobile-carnegie-english-dc.xml'
				, name: 'Washington'
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
				, name: 'Videos'
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