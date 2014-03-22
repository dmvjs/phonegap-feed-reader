function get() {
  return navigator.connection.type;
}

function online(e) {
		console.log(e)
    //alert(get())
}

function offline(e) {
    console.log(e)
    //alert(get());
}

module.exports = {
    online: online
    , offline: offline
    , get: get
}