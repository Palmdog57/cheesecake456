module.exports = {
	name: 'kick',
	description: 'Tag a member and kick them (but not really).',
	execute(msg) {
		if (!msg.mentions.users.size) {
			return msg.reply('you need to tag a user in order to kick them!');
		}

		const taggedUser = msg.mentions.users.first();

		msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
	},
};
