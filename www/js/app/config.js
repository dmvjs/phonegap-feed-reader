/*global module, require*/

module.exports = {
	fs: void 0
	, appName: 'Eurasia'
	, track: true
	, trackId: 'UA-31877-23'
	, folder: 'com.ceip.carnegieeurasiaoutlook'
	, storyFontSize: 1.0
	, connectionMessage: 'No network connection detected'
	, menuMessage: 'Not yet downloaded'
	, missingImage: 'http://m.ceip.org/img/appsupport/image-unavailable_605x328.png'
	, missingImageRef: void 0
	, menu: [{
		title: 'Analysis'
		, sub: 'Read Offline'
		, feeds: [{
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppEurasiaOutlook'
			, name: 'Latest Analysis'
			, filename: 'eurasia.json'
			, type: 'json'
			, required: true
		}]
	}, {
		title: 'Blogs'
		, sub: 'From m.ceip.org'
		, links: [{
			url: 'http://m.ceip.org/moscow/eurasiaoutlook/issues/1243/'
			, name: 'Domestic Politics'
		}, {
			url: 'http://m.ceip.org/moscow/eurasiaoutlook/issues/1241/'
			, name: 'Economics'
		}, {
			url: 'http://m.ceip.org/moscow/eurasiaoutlook/issues/1232/'
			, name: 'Geopolitics'
		}, {
			url: 'http://m.ceip.org/moscow/eurasiaoutlook/issues/1357/'
			, name: 'Humanitarian Issues'
		}, {
            url: 'http://m.ceip.org/moscow/eurasiaoutlook/issues/1356/'
            , name: 'Nuclear'
        }, {
            url: 'http://m.ceip.org/moscow/eurasiaoutlook/issues/1239/'
            , name: 'Religion, Culture, and Ethnicity'
        }, {
            url: 'http://m.ceip.org/moscow/eurasiaoutlook/issues/1355/'
            , name: 'Security and Conflict'
        }]
	}, {
        title: 'Browse Regions'
        , links: [{
            url: 'http://m.ceip.org/moscow/eurasiaoutlook/regions/1359/'
            , name: 'Caucasus'
        }, {
            url: 'http://m.ceip.org/moscow/eurasiaoutlook/regions/1358/'
            , name: 'Central Asia'
        }, {
            url: 'http://m.ceip.org/moscow/eurasiaoutlook/regions/1261/'
            , name: 'East and South Asia'
        }, {
            url: 'http://m.ceip.org/moscow/eurasiaoutlook/regions/1230/'
            , name: 'EU'
        }, {
            url: 'http://m.ceip.org/moscow/eurasiaoutlook/regions/1360/'
            , name: 'New Eastern Europe'
        }, {
            url: 'http://m.ceip.org/moscow/eurasiaoutlook/regions/1228/'
            , name: 'Russia'
        }, {
            url: 'http://m.ceip.org/moscow/eurasiaoutlook/regions/1361/'
            , name: 'Western Asia'
        }]
    }, {
		title: 'Explore'
		, links: [{
			url: 'http://m.ceip.org/moscow/eurasiaoutlook/about/'
			, name: 'About Eurasia Outlook'
		}, {
			url: 'http://m.ceip.org/moscow/eurasiaoutlook/'
			, name: 'Archive'
		}]
	}]
};