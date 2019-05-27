module.exports = {
	name: 'beep',
	description: 'Beep!',
	execute(msg) {
		msg.channel.send('Boop.');
	},
};
