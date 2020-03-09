module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(msg) {
		msg.channel.send('Pong.');
	},
};

//Copyright (C) 2020  Thomas Stephen Palmer