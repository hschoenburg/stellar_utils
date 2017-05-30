var StellarSdk = require('stellar-sdk')
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// Get a message any time a payment occurs. Cursor is set to "now" to be notified
// of payments happening starting from when this script runs (as opposed to from
// the beginning of time).

var es = server.operations()
  .cursor('now')
  .stream({
    onmessage: function (message) {
      console.log(message);
    }
  })
