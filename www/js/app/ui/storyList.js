var config = require('../config')
function show(feedObj) {
	var obj = feedObj.story
		, html = '';

  obj.forEach(function (element) {
    var image = element.image ? config.fs + element.image.split('/').pop() : config.missingImageRef.toURL();
    html += 
    '<li>\
    	<div class="story-item">\
    		<img src="' + image + '" class="story-image"/>\
  			<div class="story-text">\
  				<div class="story-title">' + element.title + '</div>\
  				<div class="story-author">' + element.author + '</div>\
  				<div class="story-date">' + element.pubDate + '</div>\
  			</div>\
  		</div>\
  	</li>';
  });

  $('.story-list ul').html(html);

  $('.story-item').on('click', function (e) {
    var li = $(this).closest('li'),
      index = $('.story-list ul li').index(li);
			$('.story-item.selected').removeClass('selected'); 
			$(this).addClass('selected');   
  });

  $('.story-image').on('error', function (e) {
    $(this).prop('src', config.missingImageRef.toURL());
  })
}

module.exports = {
	show: show
}