module.exports = {
	fs: void 0
	, folder: 'com.ceip.carnegie'
	, storyFontSize: 1.1
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
				url: 'http://m.ceip.org/moscow/eurasiaoutlook/'
				, name: 'Eurasia Outlook'
			}, {
				url: 'http://m.ceip.org/sada/'
				, name: 'Sada'
			}, {
				url: 'http://m.ceip.org/brussels/strategiceurope'
				, name: 'Strategic Europe'
			}]
		}, {
			title: 'Global Resources'
			, links: [{
				url: 'http://m.ceip.org/issues/'
				, name: 'Issues'
			}, {
				url: 'http://m.ceip.org/regions/'
				, name: 'Regions'
			}, {
				url: 'http://m.ceip.org/experts/'
				, name: 'Experts'
			}, {
				url: 'http://m.ceip.org/publications/'
				, name: 'Publications'
			}, {
				url: 'http://m.ceip.org/events/'
				, name: 'Events'
			}]
		}, {
			title: 'Explore'
			, links: [{
				url: 'http://m.ceip.org/about/'
				, name: 'About Us'
			}, {
				url: 'http://m.ceip.org/support/&lang=en'
				, name: 'Support Carnegie'
			}, {
				url: 'http://m.ceip.org/about/&fa=contact'
				, name: 'Help Desk'
			}, {
				url: 'http://m.ceip.org/about/&lang=en&fa=privacy'
				, name: 'Privacy Statement'
			}]
		}
	]
};