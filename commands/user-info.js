module.exports = {
	name: 'user-info',
	description: 'Display info about yourself.',
	execute(msg) {
	try{
		msg.channel.send(`Your username: ${msg.author.username}\nYour ID: ${msg.author.id}`);
		//log.info(`Command ${commandName} executed by ${msg.author.username}`);
	}catch(error){
		console.error(error);
		//log.error(`Command ${commandName} failed with error: ${error}`);
	}}
};
