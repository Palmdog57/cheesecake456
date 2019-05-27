const request = require('request'); 

const Discord = require("discord.js")

module.exports = {
	name: 'catz',
	description: 'Whos a pretty kitty',
	execute(msg) {
		request('http://edgecats.net/random', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                    let emb = new Discord.RichEmbed()
                    .setImage(body)
                    .setColor("#00ff00")
                    .setTitle("Here is your random cat")
                              
					msg.channel.send(emb)
				}
			}
			)
		}
	};