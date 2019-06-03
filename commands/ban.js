module.exports = {
	name: 'ban',
	description: 'Tag a member and ban them FOREVER.',
	execute(msg, args) {
        let member = msg.mentions.members.first();
        if(!member)
          return msg.reply("Please mention a valid member of this server");
        if(!member.bannable) 
          return msg.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
    
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
        
        try{
            member.ban(reason)
        }catch(error){
          console.error(error);
        }
        msg.reply(`${member.user.tag} has been banned by ${msg.author.tag} because: ${reason}`);
    }
};