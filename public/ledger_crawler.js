var fs = requie('fs')
var StellarSdk = require('stellar-sdk');
StellarSdk.Network.usePublicNetwork();

var server = new StellarSdk.Server('https://horizon.stellar.org');

var php = new StellarSdk.Asset('PHP', 'GBUQWP3BOUZX34TOND2QV7QQ7K7VJTG6VSE7WMLBTMDJLLAW7YKGU6EP');


var trades = server.orderbook(php, StellarSdk.Asset.native()).trades();



// just returns the  result of the below GET request.
// orderbooks are specifically between a pair of asserts 

//setTimeout(function() { console.log(trades); console.log('Waiting on trades')}, 1000)


// just GET this URL and see the orderbook
// https://horizon.stellar.org/order_book?selling_asset_type=credit_alphanum4&selling_asset_code=PHP&selling_asset_issuer=GBUQWP3BOUZX34TOND2QV7QQ7K7VJTG6VSE7WMLBTMDJLLAW7YKGU6EP&buying_asset_type=native'



