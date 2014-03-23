var notify = require('./notify')
	, config = require('../app/config');

function get() {
  return navigator.connection.type;
}

function online(e) {
		//console.log(e)
		$('header .menu .offline').fadeOut();
    //alert(get())
}

function offline(e) {
    //console.log(e)
    $('header .menu .offline').fadeIn();
    //alert(get());
}

$(document).on('click', 'header.menu .offline', function () {
	notify.alert(config.connectionMessage);
})

module.exports = {
    online: online
    , offline: offline
    , get: get
}