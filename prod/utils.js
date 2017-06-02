var request = require('request');
var Promise = require('bluebird');
var StellarSdk = require('stellar-sdk');
require('dotenv').config();
StellarSdk.Network.useTestNetwork();

var server = new StellarSdk.Server('https://horizon.stellar.org');


exports.balancesForKey = function(pub_key) {
  server.loadAccount(pub_key).then(function(account) {
    console.log('Balances for account: ' + pub_key);
    account.balances.forEach(function(balance) {
      console.log('Code:', balance.asset_code, 'Type:', balance.asset_type, ', Balance:', balance.balance);
    })
  })
}

exports.resolveFederatedAddress = function(addr) {

  // request addr from coins federation address
  // then need to figure out how to send PHP to the coins address
} 

exports.createAccount = function(opts) {

  return new Promise(function(fulfill, reject) {

    server.loadAccount(opts.funder.publicKey())
      .then(function(funder) {
        var txn = new StellarSdk.TransactionBuilder(funder)
          .addOperation(StellarSdk.Operation.createAccount({
            destination: opts.receiver.publicKey(),
            startingBalance: opts.balance
          }))
          .build()

        txn.sign(opts.funder)
        return server.submitTransaction(txn)
      }).then(function(result) {
        console.log('Account Created')
        fulfill(result);
      })
      .catch(function(error) {
        throw error;
      })
  })
}


exports.sendPayment = function(opts) {

	return new Promise(function(fulfill, reject) {

    server.loadAccount(opts.receiver.publicKey())

    .then(function(receiver) {
      return server.loadAccount(opts.sender.publicKey())
    })

		.then(function(sender) {
      //console.log(opts);
			var transaction = new StellarSdk.TransactionBuilder(sender)
				.addOperation(StellarSdk.Operation.payment({
					destination: opts.receiver.publicKey(),
					asset: StellarSdk.Asset.native(),
					amount: opts.amount
				}))
				.build();
			transaction.sign(opts.sender)
			return server.submitTransaction(transaction);
		}).then(function(result) {
      console.log('Sucessful Submission?')
			fulfill(result);
		})
		.catch(function(error) {
      console.log("^^^^^^^^^^^^^^^  ERROR ^^^^^^^^^^^^^^^^^")
      console.log(error.extras.result_codes.operations)
			reject(error);
		});
	})
}


exports.createTrustLine = function(opts) {
	return new Promise(function(fulfill, reject) {
// First, the receiving account must trust the asset
	server.loadAccount(opts.buyer.publicKey())
  .then(function(receiver) {
    var transaction = new StellarSdk.TransactionBuilder(receiver)
      // The `changeTrust` operation creates (or alters) a trustline
      // The `limit` parameter below is optional
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: opts.asset,
        limit: opts.limit
      }))
      .build();
    transaction.sign(opts.buyer)
    return server.submitTransaction(transaction)
		}).then(function(result) {
			fulfill(result);
		})
		.catch(function(err) {
			reject(err) 
		})
	})
}


exports.fundTestAccount = function(pubKey) {

  return new Promise(function(fulfill,reject) {
    request.get({
      url: 'https://horizon-testnet.stellar.org/friendbot',
      qs: { addr: pubKey },
        json: true
    }, function(error, response, body) {
        if (error || response.statusCode !== 200) {
          console.error('ERROR!', error || body);
          reject(error);
        }
        else {
          fulfill(body)
          console.log('SUCCESS! You have a new account :)\n', body);
        }
    });
    })
  }


exports.sendXLM = function(opts) {

  server.loadAccount(opts.destinationId)

  .catch(StellarSdk.NotFoundError, function(error) {
    throw new Error('Destination account does not exist');
  })

  .then(function(destinationAccount) {
    //console.log(destinationAccount._baseAccount._accountId)
    return server.loadAccount(opts.senderId)
  })

  .catch(StellarSdk.NotFoundError, function(error) {
    throw new Error('Source account does not exist' + error) 
  })

  .then(function(sourceAccount) {

    var txn = new StellarSdk.TransactionBuilder(sourceAccount) 
      .addOperation(StellarSdk.Operation.payment({
        destination: opts.destinationId,
        asset: StellarSdk.Asset.native(),
        amount: "100"
      }))
      
    .addMemo(StellarSdk.Memo.id(223))
    .build();

    txn.sign(opts.pair)

    return server.submitTransaction(txn)

  })

  .then(function(result) {
    console.log('Success! Results:', result);
    })
  .catch(function(error) {
    throw error
    console.log(error);
    throw new Error('Something wrong with Txn', error);
    });
}


exports.XLMForAsset = function(buyer_keys, asset) {

  return new Promise(function(fulfill, reject) {

  	server.loadAccount(buyer_keys.publicKey())

		.then(function(account) {
			var transaction = new StellarSdk.TransactionBuilder(account)

				.addOperation(StellarSdk.Operation.manageOffer({

          selling: StellarSdk.Asset.native(),
          buying: asset,
          amount: '100',
          price: '0.10'
				}))
				.build();
			transaction.sign(buyer_keys)
			fulfill(server.submitTransaction(transaction))
    })
    .catch(function(err) { console.log(err); reject(err) })
  })
}


exports.setKeys = function() {
  return new Promise(function(fulfill, reject) {
    var issuer = StellarSdk.Keypair.fromSecret(process.env.ISSUER_SECRET)
    var buyer  = StellarSdk.Keypair.fromSecret(process.env.BUYER_SECRET)
    var base   = StellarSdk.Keypair.fromSecret(process.env.BASE_SECRET)
    var app    = StellarSdk.Keypair.fromSecret(process.env.APP_SECRET)
    var live   = StellarSdk.Keypair.fromSecret(process.env.LIVE_SECRET)
  keys = { issuer: issuer, buyer: buyer, base: base, app: app, live: live }
  fulfill(keys)
  })
}


