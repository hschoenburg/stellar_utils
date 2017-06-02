// MODULES
var StellarSdk = require('stellar-sdk');
var Promise = require('bluebird')
require('dotenv').config()

var utils = require('./utils')

// SETUP
StellarSdk.Network.usePublicNetwork();

// GLOBAL VARS

var server = new StellarSdk.Server('https://horizon.stellar.org');

var phpAsset = new StellarSdk.Asset('PHP', 'GBUQWP3BOUZX34TOND2QV7QQ7K7VJTG6VSE7WMLBTMDJLLAW7YKGU6EP')

var eurtAsset = new StellarSdk.Asset('EURT','GAP5LETOV6YIE62YAM56STDANPRDO7ZFDBGSNHJQIYGGKSMOZAHOOS2S')

var CoinsKey = 'GBUQWP3BOUZX34TOND2QV7QQ7K7VJTG6VSE7WMLBTMDJLLAW7YKGU6EP'

var HansKey = 'GD244U35EWNXFB5KVQRVJYZKQYQIOZ5HQZTXXXHUCXHREYMI7DM3RAJK'

utils.setKeys().then(function(keys) {

  utils.balancesForKey(keys.base.publicKey());
})

  //utils.createAccount({funder: keys.live, receiver: keys.base, balance: '30' })

  //utils.createTrustLine({ asset: phpAsset, buyer: keys.base, limit: '1000' })
  //
  //NExt up!  Federation and Compliance!
  //
  //https://www.stellar.org/developers/guides/compliance-protocol.html

  // send XLM from Live to Base
  //utils.sendPayment({ sender: keys.live, receiver: keys.base,  asset: StellarSdk.Asset.native(), amount: '1000'})
    
  //utils.XLMForAsset(keys.base, phpAsset)
  //.then(function(result) { console.log(result); })

  //.catch(function(err) { console.log(err.extras.result_codes.operations); throw(err) })


  /*

  	server.loadAccount(keys.issuer.publicKey())

		.then(function(account) {
			var transaction = new StellarSdk.TransactionBuilder(account)
				.addOperation(StellarSdk.Operation.manageOffer({
          buying: StellarSdk.Asset.native(),
          selling: BitAsset,
          amount: '5000',
          price: { n: 6, d:11},
				}))
				.build();
			transaction.sign(keys.issuer)
			return server.submitTransaction(transaction);
		}).then(function(result) {
      console.log(result);
    })
    .catch(function(err) {
      throw err;
    })
    */

  //utils.sendPayment({sender: keys.issuer, receiver: keys.buyer, asset: BitAsset, amount: '10'})
	//utils.createTrustLine(BitAsset, keys.buyer)

// UTILITY FUNCTIONS



//var trades = server.orderbook(php, StellarSdk.Asset.native()).trades();
// just returns the  result of the below GET request.
// orderbooks are specifically between a pair of asserts 

//setTimeout(function() { console.log(trades); console.log('Waiting on trades')}, 1000)


// just GET this URL and see the orderbook
// https://horizon.stellar.org/order_book?selling_asset_type=credit_alphanum4&selling_asset_code=PHP&selling_asset_issuer=GBUQWP3BOUZX34TOND2QV7QQ7K7VJTG6VSE7WMLBTMDJLLAW7YKGU6EP&buying_asset_type=native'



