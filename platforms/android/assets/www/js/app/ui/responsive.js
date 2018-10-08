module.exports = (function () {
  var win = $(window)
    , w = win.width()
    , h = win.height();

  if (parseInt(Math.min(w, h), 10) >= 550) {
	  $('body').addClass('tablet');
  }
}());