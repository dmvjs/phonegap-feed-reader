module.exports = function (fileentry) {
    console.log('removing...')
    return new Promise(function (resolve, reject) {
        fileentry.remove(resolve, reject)
    });
};