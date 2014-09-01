/*global module, require*/

module.exports = {
	fs: void 0
	, appName: 'Strategic Europe'
	, track: false
	, trackId: 'UA-31877-29'
	, folder: 'com.ceip.stragetegiceurope'
	, storyFontSize: 1.0
	, connectionMessage: 'No network connection detected'
	, menuMessage: 'Not yet downloaded'
	, missingImage: 'http://m.ceip.org/img/appsupport/image-unavailable_605x328.png'
	, missingImageRef: void 0
	, menu: [{
		title: 'Strategic Europe'
		, sub: 'Read Offline'
		, feeds: [{
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppStrategicEurope'
			, name: 'Refresh Posts'
			, filename: 'europe.json'
			, type: 'json'
			, required: true
		}]
	}, {
		title: 'Browse Issues'
		, links: [{
			url: 'http://m.ceip.org/brussels/strategiceurope/issues/1207/'
			, name: 'Energy and Climate'
		}, {
			url: 'http://m.ceip.org/brussels/strategiceurope/issues/1191/'
			, name: 'EU and the World'
		}, {
			url: 'http://m.ceip.org/brussels/strategiceurope/issues/1190/'
			, name: 'Eurozone Crisis'
		}, {
			url: 'http://m.ceip.org/brussels/strategiceurope/issues/1208/'
			, name: 'International Economics'
		}, {
            url: 'http://m.ceip.org/brussels/strategiceurope/issues/1209/'
            , name: 'Nuclear Policy'
        }, {
            url: 'http://m.ceip.org/brussels/strategiceurope/issues/1210/'
            , name: 'Political Reform'
        }, {
            url: 'http://m.ceip.org/brussels/strategiceurope/issues/1211/'
            , name: 'Security'
        }]
	}, {
		title: 'Browse Regions'
		, links: [{
			url: 'http://m.ceip.org/brussels/strategiceurope/regions/1206/'
			, name: 'Americas'
		}, {
			url: 'http://m.ceip.org/brussels/strategiceurope/regions/1200/'
			, name: 'Balkans'
		}, {
			url: 'http://m.ceip.org/brussels/strategiceurope/regions/1203/'
			, name: 'Central Asia'
		}, {
			url: 'http://m.ceip.org/brussels/strategiceurope/regions/1204/'
			, name: 'East Asia'
		}, {
			url: 'http://m.ceip.org/brussels/strategiceurope/regions/1199/'
			, name: 'Eastern Europe'
		}, {
			url: 'http://m.ceip.org/brussels/strategiceurope/regions/1201/'
			, name: 'Middle East'
		}, {
			url: 'http://m.ceip.org/brussels/strategiceurope/regions/1202/'
			, name: 'North Africa'
		}, {
			url: 'http://m.ceip.org/brussels/strategiceurope/regions/1189/'
			, name: 'Russia and Caucasus'
		}, {
            url: 'http://m.ceip.org/brussels/strategiceurope/regions/1205/'
            , name: 'South Asia'
        }, {
            url: 'http://m.ceip.org/brussels/strategiceurope/regions/1188/'
            , name: 'Western Europe'
        }]
	}, {
		title: 'Explore'
		, links: [{
			url: 'http://m.ceip.org/brussels/strategiceurope/about/'
			, name: 'About Judy Dempsey'
		}, {
			url: 'http://m.ceip.org/brussels/strategiceurope/'
			, name: 'Complete Archive'
		}, {
			url: 'http://m.ceip.org/brussels/strategiceurope/issues/1213/'
			, name: 'Judy Asks Archive'
		}]
	}]
};