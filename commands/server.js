module.exports = {
	name: 'server',
	description: 'Display info about this server.',
	execute(msg) {
		msg.channel.send(`Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
	},
};

//Copyright (C) 2020  Thomas Stephen Palmer