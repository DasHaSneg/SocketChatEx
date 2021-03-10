'use strict';

class WebSockets {
	users = [];
	numUsers = 0;
	connection(client) {
		let addedUser = false;

		client.on('new message', (data) => {
			client.broadcast.emit('new message', {
				username: client.username,
				message: data,
			});
		});

		client.on('add user', (username) => {
			if (addedUser) return;

			client.username = username;
			++this.numUsers;
			addedUser = true;
			client.emit('login', {
				numUsers: this.numUsers,
			});
			// echo globally (all clients) that a person has connected
			client.broadcast.emit('user joined', {
				username: client.username,
				numUsers: this.numUsers,
			});
		});

		// when the client emits 'typing', we broadcast it to others
		client.on('typing', () => {
			client.broadcast.emit('typing', {
				username: client.username
			});
		});

		// when the client emits 'stop typing', we broadcast it to others
		client.on('stop typing', () => {
			client.broadcast.emit('stop typing', {
				username: client.username
			});
		});

		// when the user disconnects.. perform this
		client.on('disconnect', () => {
			if (addedUser) {
				--this.numUsers;

				// echo globally that this client has left
				client.broadcast.emit('user left', {
					username: client.username,
					numUsers: this.numUsers
				});
			}
		});
		// // event fired when the chat room is disconnected
		// client.on('disconnect', () => {
		// 	this.users = this.users.filter((user) => user.socketId !== client.id);
		// });
		// // add identity of user mapped to the socket id
		// client.on('identity', (userId) => {
		// 	this.users.push({
		// 		socketId: client.id,
		// 		userId: userId,
		// 	});
		// });
		// // subscribe person to chat & other user as well
		// client.on('subscribe', (room, otherUserId = '') => {
		// 	this.subscribeOtherUser(room, otherUserId);
		// 	client.join(room);
		// });
		// // mute a chat room
		// client.on('unsubscribe', (room) => {
		// 	client.leave(room);
		// });
	}

	// subscribeOtherUser(room, otherUserId) {
	// 	const userSockets = this.users.filter((user) => user.userId === otherUserId);
	// 	userSockets.map((userInfo) => {
	// 		const socketConn = global.io.sockets.connected(userInfo.socketId);
	// 		if (socketConn) {
	// 			socketConn.join(room);
	// 		}
	// 	});
	// }
}

module.exports = new WebSockets();
