var HOST = '0.0.0.0';
var SIZE = 1024;
var MSG = new Buffer('4500');

var dgram = require('dgram');
var server500 = dgram.createSocket('udp4');
var server4500 = dgram.createSocket('udp4');

server500.on('listening', function () {
    var address = server500.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server4500.on('listening', function () {
    var address = server4500.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server500.on('message', function (message, remote) {
    var message = new Buffer(SIZE);
    message.fill(0);
    MSG.copy(message, 1, 1, 4);
    console.log('Recv from: ' + remote.address + ':' + remote.port +' - ' + message);
    server500.send(message, 0, message.length, remote.port, remote.address, function(err, bytes) {
        if (err) throw err;
        console.log('Reply to ' + remote.address +':'+  remote.port);
    });
});

server4500.on('message', function (message, remote) {
    var message = new Buffer(SIZE);
    message.fill(0);
    MSG.copy(message, 0, 0, 4);
    console.log('Recv from: ' + remote.address + ':' + remote.port +' - ' + message);
    server4500.send(message, 0, message.length, remote.port, remote.address, function(err, bytes) {
        if (err) throw err;
        console.log('Reply to ' + remote.address +':'+  remote.port);
    });
});

server500.bind(500, HOST);
server4500.bind(4500, HOST);
