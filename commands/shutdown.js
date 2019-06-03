module.exports = {
	name: 'shutdown',
	description: 'cheesecakeBot needs his sleep.',
	async execute(msg) {
        if(msg.author.id != "397446685061677066") return msg.channel.send("and so it begins")

        try{
            await msg.channel.send("Bot going for shutdown");
            process.exit();
        } catch(e){
            msg.channel.send(`ERROR ${e.message}`)
            }
    }
};