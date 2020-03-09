module.exports = {
	name: 'kick',
	description: 'Tag a member and kick them (but not really).',
	execute(msg, args) {
		let member = msg.mentions.members.first() || msg.guild.members.get(args[0]);
    	if(!member)
      		return msg.reply("Please mention a valid member of this server");
    	if(!member.kickable) 
			return msg.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

		let reason = args.slice(1).join(' ');
		if(!reason) reason = "No reason provided";
		try{
			member.kick(reason)
		} catch(error){
			console.error(error);
			}
		
		msg.reply(`${member.user.tag} has been kicked by ${msg.author.tag} because: ${reason}`);	
	}
};

//Copyright (C) 2020  Thomas Stephen Palmer