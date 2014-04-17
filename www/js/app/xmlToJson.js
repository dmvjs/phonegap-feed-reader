/*global module, require*/
module.exports = function (res) {
	var feedObject = {}
    , root = res.firstChild.firstChild
    , numberOfFeeds = root.childNodes.length - 2
    , i
    , j;

  feedObject.title = root.childNodes[0].textContent;
  feedObject.lastBuildDate = root.childNodes[1].textContent;
  feedObject.item = [];

  for (i = 0; i < numberOfFeeds; i += 1) {
    feedObject.item[i] = {};
    for (j = 0; j < root.childNodes[2 + i].childNodes.length; j += 1) {
      feedObject.item[i][root.childNodes[2 + i].childNodes[j].nodeName] = root.childNodes[2 + i].childNodes[j].textContent;
    }
  }
  return feedObject;
};