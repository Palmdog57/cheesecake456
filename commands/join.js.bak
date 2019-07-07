module.exports = {
	name: 'join',
	description: 'add cheesecakeBot to a voice channel.',
	async execute(msg, args, queue) {        
        //console.log(msg.guild.id);

        let voiceChannel = msg.member.guild.channels.get('583367582439178267');
        let textChannel = msg.member.guild.channels.get('580857659700281533');
        
        const queueConstruct = {
            textChannel: textChannel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            playing: false,
        };       
        queue.set(msg.guild.id, queueConstruct);
        /*
        let connection = await voiceChannel.join()
        console.log(connection.play)
        const dispatcher = connection.play('/home/ubuntu/tada.mp3');*/

        try {
            queueConstruct.connection = await voiceChannel.join();
        } catch (err) {
            console.log(err);
            queue.delete(msg.guild.id);
            return msg.channel.send(err);
        }
    }
};