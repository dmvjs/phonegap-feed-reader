/*global require, module, $*/
var notify = require('./notify')
	, config = require('../app/config');

function get() {
	return navigator.connection.type;
}

function online(e) {
	$('header .menu .offline').fadeOut();
}

function offline(e) {
	$('header .menu .offline').fadeIn();
}

$('header .menu .offline').on('click', function () {
	notify.alert(config.connectionMessage);
});

module.exports = {
	online: online
	, offline: offline
	, get: get
};