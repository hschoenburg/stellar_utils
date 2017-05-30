var request = require('request');
var Promise = require('bluebird');
var StellarSdk = require('stellar-sdk');
StellarSdk.Network.usePublicNetwork();

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

exports.showBalance = function(pub_key) {
  server.loadAccount(pub_key).then(function(account) {
    console.log('Balances for account: ' + pub_key);
    account.balances.forEach(function(balance) {
      console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
    })
  })
}

exports.resolveAddr = function(addr) {

  // request addr from coins federation address
  // then need to figure out how to send PHP to the coins address

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

exports.fundAccount = function(pair) {

  console.log(pair.publicKey())
  console.log('$$$');
  console.log(pair.secret())

  request.get({
    url: 'https://horizon-testnet.stellar.org/friendbot',
    qs: { addr: pair.publicKey() },
    json: true
  }, function(error, response, body) {
    if (error || response.statusCode !== 200) {
      console.error('ERROR!', error || body);
    }
    else {
      console.log('SUCCESS! You have a new account :)\n', body);
    }
  })
}

