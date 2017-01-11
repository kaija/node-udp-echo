var PORT = 500;
var HOST = 'server.com';

var dgram = require('dgram');
var message = new Buffer('test');

var client = dgram.createSocket('udp4');
client.on('listening', function(){
    var address = client.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});


client.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message + ' : ' + message.length);
});

client.bind([], '0.0.0.0');
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    //client.close();
});
