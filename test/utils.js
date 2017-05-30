var request = require('request');
var Promise = require('bluebird');
var StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');


exports.balancesForKey = function(pub_key) {
  server.loadAccount(pub_key).then(function(account) {
    console.log('Balances for account: ' + pub_key);
    account.balances.forEach(function(balance) {
      console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
    })
  })
}

exports.resolveFederatedAddress = function(addr) {

  // request addr from coins federation address
  // then need to figure out how to send PHP to the coins address
} 

exports.createTrustLine = function(asset, receiver_keys) {
	return new Promise(function(fulfill, reject) {
// First, the receiving account must trust the asset
	server.loadAccount(receiver_keys.publicKey())
  .then(function(receiver) {
    var transaction = new StellarSdk.TransactionBuilder(receiver)
      // The `changeTrust` operation creates (or alters) a trustline
      // The `limit` parameter below is optional
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: asset,
        limit: '9999'
      }))
      .build();
    transaction.sign(receiver_keys)
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

