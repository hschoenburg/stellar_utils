var StellarSdk = require('stellar-sdk')
var server = new StellarSdk.Server('https://horizon.stellar.org');

// Get a message any time a payment occurs. Cursor is set to "now" to be notified
// of payments happening starting from when this script runs (as opposed to from
// the beginning of time).

var es = server.operations()
  .cursor('now')
  .stream({
    onmessage: function (message) {
      if(message.source_account == 'GD244U35EWNXFB5KVQRVJYZKQYQIOZ5HQZTXXXHUCXHREYMI7DM3RAJK') {
        console.log(message)
      }
    }
  })
