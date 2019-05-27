module.exports = {
	name: 'avatar',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	execute(msg) {
		if (!msg.mentions.users.size) {
			return msg.channel.send(`Your avatar: ${msg.author.displayAvatarURL()}`);
		}

		const avatarList = msg.mentions.users.map(user => {
			return `${user.username}'s avatar: ${user.displayAvatarURL()}`;
		});

		msg.channel.send(avatarList);
	},
};
