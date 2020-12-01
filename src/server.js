'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log("Ready!");
});

client.on('message', msg => {
	if (msg.content.startsWith('june help') || msg.content.startsWith('j!help') || msg.content.startsWith('June help')) {
		msg.reply("I don't have a lot of options yet. Here they are:");
		const help = new Discord.MessageEmbed()
			.setTitle("June's commands")
			.addField('Addressing June', 'You can ask June by typing "june", "June" or "j!".')
			.addField("`j!help`, `June help`", "Ask for help (this command!)");
		msg.channel.send(help);
	} else if (msg.content.startsWith('june') || msg.content.startsWith('j!') || msg.content.startsWith('June')) {
		msg.reply("I'm still under construction, but thanks for talking to me!");
	}
});

client.login(process.env.DISCORD_TOKEN);
