//var StellarBit = require('./stellarBit')
var StellarSdk = require('stellar-sdk')

var testPubOne    = 'GBKFLN553AUG32BDW5UHYQWEQRD3U5QZPQA5IWNXZ62453VLREWBXAE5'

var testPubTwo    = 'GCCOXY5LTVZ5GQVQDIKS6235QEZOISGKEUU4WHQ2SUDDBLLHT7ZXC5TX'

var testSecretOne = 'SC2EPWKXJVFVFQIGWIJQUKBC3DS7NZ3Z7OLHKYOCHMKWLP4BM3JBU2YK'

var testSecretTwo = 'SBBMTA4DQNRNNH24DPSUOFHKOLM6QTHNHNALH2NPJKDGEJTT6ZJR7RN7'

var realSec = 'SBFFEKDAGCMQDRENJQULBSAU7NJT36LIZUAYGXX2FKHGMJDCF4FCXDIB'

var livePub = 'GD2EJI242YIKDC3IT3IKBSXH5UBHA5OMBG2MIRFWYV2K264CXGI5JXFA'

var coinsPub = "GCKX3XVTPVNFXQWLQCIBZX6OOPOIUT7FOAZVNOFCNEIXEZFRFSPNZKZT"

//StellarBit.showBalance(realPub);
//console.log("$$$$$$$$$$$$");
//return StellarBit.showBalance(testPubTwo);
//var pair = StellarSdk.Keypair.fromSecret(realSec)
//console.log('sending XLM')
//return StellarBit.sendXLM({ senderId: livePub, destinationId: coinsPub, pair: pair})

//var pair = StellarSdk.Keypair.fromSecret(secret)
var pair = StellarSdk.Keypair.random()
console.log(pair.secret())
//var command = process.argv[2]
//return StellarBit.createAccount();
//

