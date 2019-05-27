const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const fetch = require('node-fetch');
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'/home/ubuntu/cheesecake456/bot.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },

log = SimpleNodeLogger.createSimpleLogger( opts );


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	log.info(`Connected @ ${new Date().toJSON()}`);
});

client.on('message', async (msg) => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;
  		const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
  }

	try {
		command.execute(msg, args);
		log.info(`Command ${commandName} executed by ${msg.author.username}`);
	} catch (error) {
		console.error(error);
		log.error("Exited with the following message: ", error);
		msg.reply('there was an error trying to execute that command!');
	}
});

client.login(token);