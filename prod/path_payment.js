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

//var HansKey = 'GD244U35EWNXFB5KVQRVJYZKQYQIOZ5HQZTXXXHUCXHREYMI7DM3RAJK'

var HansKey = 'GCKX3XVTPVNFXQWLQCIBZX6OOPOIUT7FOAZVNOFCNEIXEZFRFSPNZKZT'

utils.setKeys().then(function(keys) {

    server.loadAccount(CoinsKey)

    .then(function(receiver) {
      return server.loadAccount(keys.base.publicKey())
    })

		.then(function(sender) {
			var transaction = new StellarSdk.TransactionBuilder(sender)
				.addOperation(StellarSdk.Operation.pathPayment({
          sendAsset: StellarSdk.Asset.native(),
          sendMax: '100',
          destination: HansKey,
          destAsset: phpAsset,
          destAmount: '20',
          path: [eurtAsset]
				}))
        .addMemo(StellarSdk.Memo.id('246'))
				.build();
			transaction.sign(keys.base)
			return server.submitTransaction(transaction);
		}).then(function(result) {
      console.log('Sucessful Submission?')
      console.log(result);
		})
		.catch(function(error) {
      console.log("^^^^^^^^^^^^^^^  ERROR ^^^^^^^^^^^^^^^^^")
      console.log(error);
      console.log(error.extras.result_codes.operations)
		});
	})

