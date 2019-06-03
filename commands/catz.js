const request = require('request');
const Discord = require('discord.js');

module.exports = {
    name: 'catz',
    description: 'Whos a pretty kitty',
    async execute(msg) {
        let emb = new Discord.RichEmbed();
        request('http://edgecats.net/random', function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.

            if (!error && response.statusCode == 200) {
                emb.setImage(body)
                    .setColor("#00ff00")
                    .setTitle("Here is your random cat");

                msg.channel.send(emb)
            }
        });
    }
};