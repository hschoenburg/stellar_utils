var rawCoinsKey = 'GB4ZESJAJ7K5OQ5Y64PDZJS2KRFHJ36Q7BHOACHGDGSTUEZIDR3ZYUCJ'

//var key = new Buffer(rawCoinsKey).toString('base64')
//console.log(key)

var pemtools = require('pemtools')

var fs = require('fs')

var path = require('path')

var pemCoinsKey = fs.readFileSync(path.join(__dirname, 'coins_key_pem.pem'))

fs.writeFileSync('test_key.pem', pemtools(pemCoinsKey

var StellarSdk = require('stellar-sdk');
var utils = require('./utils');
var server = new StellarSdk.Server('https://horizon.stellar.org');
var crypto = require('crypto')
var phpAsset = new StellarSdk.Asset('PHP', 'GBUQWP3BOUZX34TOND2QV7QQ7K7VJTG6VSE7WMLBTMDJLLAW7YKGU6EP')

utils.setKeys().then(function(keys) {


  server.loadAccount(keys.base.publicKey())
  .then(function(account) {
    var transaction = new StellarSdk.TransactionBuilder(account)

				.addOperation(StellarSdk.Operation.manageOffer({

          selling: StellarSdk.Asset.native(),
          buying: phpAsset,
          amount: '100',
          price: '0.10',
          sequenceNumber: 0
				}))
				.build()
  //transaction.sign(buyer_keys)
  //fulfill(server.submitTransaction(transaction))

   var tx_string = new Buffer(JSON.stringify(transaction)).toString('base64')

  var auth_body = {

    sender: 'hschoenburg@gmail.com*coins.asia',
    need_info: true,
    tx: tx_string,
    attachment: '',
  }
  var json_body = new Buffer(JSON.stringify(auth_body))
  var sign = crypto.createSign('RSA-SHA256')

  var json_body = new Buffer(JSON.stringify(auth_body))

  sign.write('hey dude help me out here');

  var sig = (sign.sign(pemCoinsKey, ['base64']))

    //uvar sig = crypto.publicEncrypt(coinsKey, json_body)

    //console.log(pemCoinsKey);


  })
})

.catch(function(err) { console.log(err) })


