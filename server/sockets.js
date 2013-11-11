//Contains socket.io events handler
var socketio = require('socket.io');

module.exports.listen = function(app){
	io = socketio.listen(app)
	io.sockets.on('connection', function (socket) {
		socket.emit('welcome', 'welcome to Tech-Connect');
	});

	return io;
}