module.exports = {
	name: 'mute',
	description: 'Tag a member and mute their ability to type.',
	execute(msg) {
        let member = msg.mentions.members.first();
            if(!member)
                return msg.reply("Please mention a valid member of this server");
            if(!member.bannable) 
                return msg.reply("I cannot mute this user! Do they have a higher role? Do I have ban permissions?");

        let mute_role = msg.roles.find(role => role.name === 'Muted');

        try{
            member.addRole(mute_role);
        }catch(error){
            console.error(error);
            msg.reply(`Sorry ${msg.author} I couldn't mute ${member} because of : ${error}`);
        }
    }
};  