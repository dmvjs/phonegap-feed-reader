module.exports = (function  () {
var prefs = plugins.appPreferences;
	prefs.store (ok, ok, 'Keep feeds updated', false);
}())

function ok(reason) {
	console.log(reason)
}