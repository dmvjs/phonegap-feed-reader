module.exports = function (fileentry) {
    
    var reader = new FileReader();

    return new Promise(function (resolve, reject) {

        fileentry.file(function (f) {
            
            reader.onloadend = resolve;

            reader.onerror = reject;

            reader.readAsText(f);
        })

    });
};