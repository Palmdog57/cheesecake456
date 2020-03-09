module.exports = {
    name: 'join',
    description: 'adds cheesecakeBot to a voice channel',
    async execute(msg, args, queue) {
        if(msg.member.voiceChannel) {

            const voiceChannel = msg.member.voiceChannel;

            const queueConstruct = {
                textChannel: msg.member.textChannel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                playing: false,
            };
            
            queue.set(msg.guild.id, queueConstruct);

            try{
                queueConstruct.connection = await voiceChannel.join();
                return queue;
            }catch(error){
                console.error(error)
            }
        }else{
            msg.reply("you must join a voice channel first!");
        }
    }
}

//Copyright (C) 2020  Thomas Stephen Palmer