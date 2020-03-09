/* ----------------- Declare && initialise required packages ---------------- */
	const fs = require('fs');

	const Discord = require('discord.js');
	const client = new Discord.Client();
	client.commands = new Discord.Collection();

	//const { prefix, token } = require('./config.json');
	require('dotenv').config();
	const prefix = process.env.PREFIX;

	const SimpleNodeLogger = require('simple-node-logger'),
	opts = {
		logFilePath:'/var/log/cheesecake456.log',
		timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
	},
	log = SimpleNodeLogger.createSimpleFileLogger( opts );
	
	var nanoid = require('nanoid');
	uuid = nanoid(10);

	var process = require('process');
	process.stdin.resume();
	
	var moment = require('moment');
	const today = moment().format("YYYY-MM-DD HH:mm:ss");
	
	const queue = new Map(); // For playing music [WIP]
/* -------------------------------------------------------------------------- */

//Import commands && initialise routing engine
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Initialise the listener
client.once('ready', () => {
	console.log('=== DISCORD BOT IS RUNNING ===');
	log.info(`[${uuid}] Connected @ [${today}] as ${client.user.username}`);
});

// Execute when a "slash command" is received
client.on('message', async (msg) => {
	// Check the bot has been pinged with a recognised prefix
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	// Grab the arguments & command requested
	const args = msg.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Check command exists and store in command variable
	if (!client.commands.has(commandName)) return;
  	const command = client.commands.get(commandName);

	// Check if arguments are needed
	// Prompt user for them if not specified.
	if (command.args && !args.length) return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);

	// Attempt to execute specified command and log result.
	// @TODO - Clean this shit up.
	try {
		command.execute(msg, args, queue);
		log.info(`[${uuid}] Command '!${commandName}' executed by ${msg.author.username}`);
	} catch (err) {
		log.error(`[${uuid}] Command '!${commandName}' failed with the following message: `, err.name);
		msg.reply('There was an error trying to execute that command!');
		fs.appendFile('/var/log/node-error.log', `\n${today} ERROR [${uuid}] Command '!${commandName}' failed with the following message: \n${err.stack}\n------------------------------------------------\n`, function () {
			console.log(`Command '!${commandName}' failed with the following message: `, err.name);
		}); 
	}
});

// Process & log shutdown of bot
process.on('SIGINT', async function(code) {  
	await log.warn(`[${uuid}] Session terminated @ ${new Date().toJSON()} with code ${code}\n`);
	return process.kill(process.pid);
});

// Connect to discord & start the above...
client.login(process.env.TOKEN);

/**
 *  Copyright (C) 2020  Thomas Stephen Palmer
 *  This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */