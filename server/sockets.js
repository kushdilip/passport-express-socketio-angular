//Contains socket.io events handler
var socketio = require('socket.io');

module.exports.listen = function(app){
	io = socketio.listen(app)
	io.sockets.on('connection', function (socket) {
		
		socket.emit('welcome', 'welcome to Tech-Connect');

		socket.on('startQuizRequest', function (data) {
			socket.broadcast.emit('startQuiz', data);
			console.log(data);
		});

	});
	return io;
}