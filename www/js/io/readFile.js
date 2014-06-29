var removeFile = require('./removeFile');

module.exports = function (fileentry) {
    var reader = new FileReader()
	    , errorHandler = window.onerror
	    , restoreHandler = function () {
		    window.onerror = errorHandler;
	    };

    return new Promise(function (resolve, reject) {
	      window.onerror = function (err) {
		      console.log(err, arguments);
		      removeFile(fileentry).then(function () {
			      restoreHandler();
			      reject()
		      }, function () {
			      restoreHandler();
			      reject()
		      })
	      };
        fileentry.file(function (f) {
          reader.onloadend = function (s) {
	          restoreHandler();
	          resolve(s);
          };
          reader.onerror = function (e) {
	          restoreHandler()
	          reject(e);
          };
          reader.readAsText(f);
        })
    });
};