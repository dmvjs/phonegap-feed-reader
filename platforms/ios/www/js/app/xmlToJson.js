/*global module, require*/
module.exports = function (res) {
	var feedObject = {item:[]}
    , root = res.firstChild.firstChild
    , numberOfNodes = root.childNodes.length
    , items = []
    , i
    , j;

  for (i = 0; i < numberOfNodes; i += 1) {
    switch (root.childNodes[i].nodeName) {
      case 'item' :
        items.push(root.childNodes[i]);
        break;
      default :
        feedObject[root.childNodes[i].nodeName] = root.childNodes[i].textContent;
        break;
    }
  }

  for (i = 0; i < items.length; i += 1) {
    feedObject.item[i] = {};
    for (j = 0; j < items[i].childNodes.length; j += 1) {
      feedObject.item[i][items[i].childNodes[j].nodeName] = items[i].childNodes[j].textContent;
    }
  }

  return feedObject;
};