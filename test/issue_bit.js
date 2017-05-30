
// MODULES
var fs = require('fs')
var path = require('path')
var StellarSdk = require('stellar-sdk');
var Promise = require('bluebird')
require('dotenv').config()
var request = require('request-promise')

var utils = require('./utils')

// SETUP
StellarSdk.Network.useTestNetwork();

// GLOBAL VARS

var keys
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');


// ACTUAL COMMANDS


setKeys(function() {

  BitAsset = new StellarSdk.Asset('BIT', keys.issuer.publicKey())

	utils.createTrustLine(BitAsset, keys.buyer)

  //utils.balancesForKey(keys.issuer.publicKey());

	.then(function() {
		console.log('Trustline created for BIT');
	})
})

/*
	// Second, the issuing account actually sends a payment using the asset
    return server.loadAccount(keys.issuer.publicKey())
  })
})
  .then(function(issuer) {
    var transaction = new StellarSdk.TransactionBuilder(issuer)
      .addOperation(StellarSdk.Operation.payment({
        destination: receivingKeys.publicKey(),
        asset: astroDollar,
        amount: '10'
      }))
      .build();
    transaction.sign(issuingKeys);
    return server.submitTransaction(transaction);
  })
  .catch(function(error) {
    console.error('Error!', error);
  });

*/
// UTILITY FUNCTIONS

function setKeys(callback) {
  var issuer = StellarSdk.Keypair.fromSecret(process.env.ISSUER_SECRET)
  var buyer  = StellarSdk.Keypair.fromSecret(process.env.BUYER_SECRET)
  var base   = StellarSdk.Keypair.fromSecret(process.env.BASE_SECRET)
  var app         = StellarSdk.Keypair.fromSecret(process.env.APP_SECRET)
  keys = { issuer: issuer, buyer: buyer, base: base, app: app }
  callback();
}


function createTrustline() {

// First, the receiving account must trust the asset
server.loadAccount(receivingKeys.publicKey())
  .then(function(receiver) {
    var transaction = new StellarSdk.TransactionBuilder(receiver)
      // The `changeTrust` operation creates (or alters) a trustline
      // The `limit` parameter below is optional
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: astroDollar,
        limit: '1000'
      }))
      .build();
    transaction.sign(receivingKeys);
    return server.submitTransaction(transaction);
  })
}


function createAsset() {

  BitAsset = new StellarSdk.Asset('BIT', issuer_keys.publicKey())

  // ToBoContinues
  // https://www.stellar.org/developers/guides/issuing-assets.html
}

//readKey()



//var trades = server.orderbook(php, StellarSdk.Asset.native()).trades();
// just returns the  result of the below GET request.
// orderbooks are specifically between a pair of asserts 

//setTimeout(function() { console.log(trades); console.log('Waiting on trades')}, 1000)


// just GET this URL and see the orderbook
// https://horizon.stellar.org/order_book?selling_asset_type=credit_alphanum4&selling_asset_code=PHP&selling_asset_issuer=GBUQWP3BOUZX34TOND2QV7QQ7K7VJTG6VSE7WMLBTMDJLLAW7YKGU6EP&buying_asset_type=native'



