var promise = require('../util/promise').promise;

module.exports = function (fileentry) {
    var p = promise()
    , reader = new FileReader();

    fileentry.file(function (f) {
        reader.onloadend = function(e) {
            p.y(e.target.result);
        };

        reader.onerror = function (e) {
            p.n(e);
        };

        reader.readAsText(f);
    })

    return p.p;
}