module.exports = {
	name: 'leave',
	description: 'removes cheesecakeBot from a voice channel.',
	async execute(msg, args, queue) {        
        if (msg.member.voiceChannel) {
            msg.member.voiceChannel.leave();
            console.log("Disconnected");
        }
    }
};