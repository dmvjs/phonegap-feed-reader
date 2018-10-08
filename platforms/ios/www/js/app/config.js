/*global module, require*/

module.exports = {
	fs: void 0
	, appName: 'Eurasia Outlook'
	, track: true
	, trackId: 'UA-31877-23'
	, folder: 'com.ceip.carnegieeurasiaoutlook'
	, storyFontSize: 1.0
	, connectionMessage: 'No network connection detected'
	, menuMessage: 'Not yet downloaded'
	, missingImage: 'http://carnegieendowment.org/app-img-not-avail.png'
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
			url: 'http://carnegie.ru/eurasiaoutlook/?fa=showIssue&id=1243&title=Domestic%20Politics'
			, name: 'Domestic Politics'
		}, {
			url: 'http://carnegie.ru/eurasiaoutlook/?fa=showIssue&id=1241&title=Economics'
			, name: 'Economics'
		}, {
			url: 'http://carnegie.ru/eurasiaoutlook/?fa=showIssue&id=1235&title=Energy%20and%20Climate'
			, name: 'Energy and Climate'
		}, {
            url: 'http://carnegie.ru/eurasiaoutlook/?fa=showIssue&id=1232&title=Geopolitics'
            , name: 'Geopolitics'
        }, {
			url: 'http://carnegie.ru/eurasiaoutlook/?fa=showIssue&id=1357&title=Humanitarian%20Issues'
			, name: 'Humanitarian Issues'
		}, {
            url: 'http://carnegie.ru/eurasiaoutlook/?fa=showIssue&id=1356&title=Nuclear'
            , name: 'Nuclear'
        }, {
            url: 'http://carnegie.ru/eurasiaoutlook/?fa=showIssue&id=1239&title=Religion,%20Culture,%20and%20Ethnicity'
            , name: 'Religion, Culture, and Ethnicity'
        }, {
            url: 'http://carnegie.ru/eurasiaoutlook/?fa=showIssue&id=1355&title=Security%20and%20Conflicts'
            , name: 'Security and Conflict'
        }]
	}, {
        title: 'Browse Regions'
        , links: [{
            url: 'http://carnegie.ru/eurasiaoutlook/?fa=showRegion&lang=en&id=1359&title=Caucasus'
            , name: 'Caucasus'
        }, {
            url: 'http://carnegie.ru/eurasiaoutlook/?fa=showRegion&lang=en&id=1358&title=Central%20Asia'
            , name: 'Central Asia'
        }, {
            url: 'http://carnegie.ru/eurasiaoutlook/?fa=showRegion&lang=en&id=1261&title=East%20and%20South%20Asia'
            , name: 'East and South Asia'
        }, {
            url: 'http://carnegie.ru/eurasiaoutlook/?fa=showRegion&lang=en&id=1230&title=EU'
            , name: 'EU'
        }, {
            url: 'http://carnegie.ru/eurasiaoutlook/?fa=showRegion&lang=en&id=1360&title=New%20Eastern%20Europe'
            , name: 'New Eastern Europe'
        }, {
            url: 'http://carnegie.ru/eurasiaoutlook/?fa=showRegion&lang=en&id=1228&title=Russia'
            , name: 'Russia'
        }, {
            url: 'http://carnegie.ru/eurasiaoutlook/?fa=showRegion&lang=en&id=1361&title=Western%20Asia'
            , name: 'Western Asia'
        }]
    }, {
		title: 'Explore'
		, links: [{
			url: 'http://carnegie.ru/eurasiaoutlook/?fa=about'
			, name: 'About Eurasia Outlook'
		}, {
			url: 'http://carnegie.ru/eurasiaOutlook/?fa=archive'
			, name: 'Archive'
		}]
	}]
};