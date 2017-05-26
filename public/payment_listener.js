var EventSource = require('eventsource');

var account_id = 'GBUQWP3BOUZX34TOND2QV7QQ7K7VJTG6VSE7WMLBTMDJLLAW7YKGU6EP';

var random_account_id = 'GAR43INPICNUPOQBFGHCSOTCX7I3GIPDI6ATIRJQG2NY5MBVQUHQZVF6';

var es = new EventSource('https://horizon.stellar.org/accounts/' + account_id + '/operations')
es.onmessage = function(message) {
      var result = message.data ? JSON.parse(message.data) : message;
      console.log('New payment:');
      console.log(result);
};
es.onerror = function(error) {
      console.log(error)
}
