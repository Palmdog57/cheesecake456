module.exports = {
	name: 'play',
	description: 'play a happy little sound file.',
	async execute(msg, queue, guild) {
		console.log(queue);
		let serverQueue = queue.get(msg.guild.id);
        let voiceChannel = msg.member.voiceChannel;

		const dispatcher = serverQueue.connection.playFile('/home/ubuntu/tada.mp3');
    }
}

//Copyright (C) 2020  Thomas Stephen Palmer