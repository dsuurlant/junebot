'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log("Ready!");
});

client.on('message', msg => {
	if (msg.content === 'ping') {
		msg.reply('Pong!');
	}
});

client.login(process.env.DISCORD_TOKEN);
