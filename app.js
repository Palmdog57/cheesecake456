const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'/var/log/cheesecake456.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },

log = SimpleNodeLogger.createSimpleFileLogger( opts );
var nanoid = require('nanoid');
var process = require('process');

var moment = require('moment');

uuid = nanoid(10);

const client = new Discord.Client();
client.commands = new Discord.Collection();
process.stdin.resume();
const queue = new Map();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	log.info(`[${uuid}] Connected @ [${moment().format("YYYY-MM-DD HH:mm:ss")}] as ${client.user.username}`);
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
		command.execute(msg, args, queue);
		log.info(`[${uuid}] Command '!${commandName}' executed by ${msg.author.username}`);
	} catch (err) {
		log.error(`[${uuid}] Command '!${commandName}' failed with the following message: `, err.name);
		msg.reply('There was an error trying to execute that command!');
		fs.appendFile('/var/log/node-error.log', `\n${moment().format("YYYY-MM-DD HH:mm:ss")} ERROR [${uuid}] Command '!${commandName}' failed with the following message: \n${err.stack}\n------------------------------------------------\n`, function () {
			console.log(`Command '!${commandName}' failed with the following message: `, err.name);
		}); 
		}
});

process.on('SIGINT', async function(code) {  
	await log.warn(`[${uuid}] Session terminated @ ${new Date().toJSON()} with code ${code}\n`);
	return process.kill(process.pid);
});

client.login(token);
