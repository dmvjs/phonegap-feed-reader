var notify = require('../util/notify');

module.exports = function (fileentry) {
    var reader = new FileReader();
    return new Promise(function (resolve, reject) {
        notify.y('in it')
        fileentry.file(function (f) {
            
            reader.onloadend = resolve;
            reader.onerror = reject;
            reader.readAsText(f);
            notify.y('bout it')
        })
        notify.y('on it')
    });
};