let socketIo = require('socket.io');

let connSocket = function (app, server) {
	console.log('connSocket', 'executado')

	let io = socketIo.listen(server);
	app.set('io', io);

	io.on('connection', function (socket) {
		console.log('Usuário conectou');
	
		socket.on('disconnect', function () {
			console.log('Usuário desconectou');
		});
	
		socket.on('msgToServer', function (data){

			/* dialogo */
			socket.emit(
				'msgToClient', 
				{ nickname: data.nickname, message: data.message }
			);
	
			socket.broadcast.emit(
				'msgToClient', 
				{ nickname: data.nickname, message: data.message }
			);
	
			/* participantes */
			if(parseInt(data.nicknameUpdatedOnClients) == 0) {
				socket.emit(
					'PartToClient', 
					{ nickname: data.nickname }
				);
	
				socket.broadcast.emit(
					'PartToClient', 
					{ nickname: data.nickname }
				);
			}
		});
	});
}

module.exports = function () {
	console.log('connSocket', 'carregado')
	return connSocket;
}
