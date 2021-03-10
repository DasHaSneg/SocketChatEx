'use strict';

const app = require('./config/app'),
	server = require('http').createServer(app),
	io = require('socket.io')(server),
	{ port } = require('./config/index'),
	WebSockets = require('./utils/WebSockets');

io.on('connection', WebSockets.connection);

server.listen(port);
server.on('listening', () => {
	console.log(`Listening on port:: http://localhost:${port}/`);
});
