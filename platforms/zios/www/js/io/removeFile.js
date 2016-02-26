module.exports = function (fileentry) {
    return new Promise(function (resolve, reject) {
        fileentry.remove(resolve, reject)
    });
};