function get() {
  return navigator.connection.type;
}

function online() {
    //alert(get())
}

function offline() {
    //alert(get());
}

module.exports = {
    online: online
    , offline: offline
    , get: get
}