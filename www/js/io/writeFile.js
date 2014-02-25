var promise = require('../util/promise').promise;

module.exports = function (filewriter, contents) {
	var p = promise();

    filewriter.onwriteend = function(e) {
        p.y();
    };

    filewriter.onerror = function (e) {
    	p.n();
    };

    filewriter.write(contents);

    return p.p;
}

