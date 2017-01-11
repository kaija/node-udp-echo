var PORT = 4500;
var HOST = '0.0.0.0';

var dgram = require('dgram');
var message = new Buffer('My KungFu is Good!');

var client = dgram.createSocket('udp4');
client.on('listening', function(){
    var address = client.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});


client.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message + ' : ' + message.length);
});

client.bind([], HOST);
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    //client.close();
});
