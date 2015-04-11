/*global module, require*/

module.exports = {
	fs: void 0
	, appName: 'Syria In Crisis'
	, track: false
	, trackId: 'UA-31877-24'
	, folder: 'org.ceip.syria'
	, storyFontSize: 1.0
	, connectionMessage: 'No network connection detected'
	, menuMessage: 'Not yet downloaded'
	, missingImage: 'http://carnegieendowment.org/app-img-not-avail.png'
	, missingImageRef: void 0
	, menu: [{
		title: 'Analysis'
		, sub: 'Read Offline'
		, feeds: [{
			url: 'http://carnegieendowment.org/rss/solr/?fa=AppSyriaInCrisis'
			, name: 'Latest Analysis'
			, filename: 'syria.json'
			, type: 'json'
			, required: true
		}]
	}]
};