var HOST = '0.0.0.0';
var SIZE = 1024;
var MSG = new Buffer('4500');

var dgram = require('dgram');
var server500 = dgram.createSocket('udp4');
var server4500 = dgram.createSocket('udp4');

function echo(buf, addr, port){
    var client = dgram.createSocket('udp4');
        client.send(buf, 0, buf.length, port, addr, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + addr +':'+ port + ' ' + buf);
        client.close();
    });
}

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
    console.log(remote.address + ':' + remote.port +' - ' + message);
    echo(message, remote.address, remote.port);
});

server4500.on('message', function (message, remote) {
    var message = new Buffer(SIZE);
    message.fill(0);
    MSG.copy(message, 0, 0, 4);
    console.log(remote.address + ':' + remote.port +' - ' + message);
    echo(message, remote.address, remote.port);
});

server500.bind(500, HOST);
server4500.bind(4500, HOST);
