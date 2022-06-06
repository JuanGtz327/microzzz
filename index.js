var express = require('express');
app = express();
server = require('http').createServer(app);
io = require('socket.io')(server);

var { SerialPort, ReadlineParser } = require("serialport")
const parser = new ReadlineParser();
var serialPort = new SerialPort({ path: "/COM5", baudRate: 9600 });
serialPort.pipe(parser);

serialPort.on('open', function () {
        console.log('Puerto Abierto');
});

serialPort.on('err', function (data) {
        console.log(err.message);
});

server.listen(8080);
app.use(express.static('public'));

io.sockets.on('connection', function (socket) {
        socket.on('msg', function (data) {
                console.log(data)
                serialPort.write(data.value,'ascii');
        });
});