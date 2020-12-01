'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();

// Bot basic configuration
const invokes = ['june', 'June', 'j!'];

client.once('ready', () => {
	console.log("Ready!");
});

client.on('message', msg => {
	let invoked = false
	for (const invoke in invokes) {
		if (msg.content.startsWith(invoke)) {
			invoked = true;
			break;
		}
	}

	if (invoked) {
		if (msg.content.endsWith('help')) {
			msg.reply("I don't have a lot of options yet. Here they are:");
			const help = new Discord.MessageEmbed()
				.setTitle("June's commands")
				.addField('Addressing June', 'You can ask June by typing "june", "June" or "j!".')
				.addField("`j!help`, `June help`", "Ask for help (this command!)");
			msg.channel.send(help);
		} else if (msg.content.endsWith('cat')) {
			// load cat
		} else if (msg.content.endsWith('dog')) {
			// load dog
		} else {
			msg.reply("I'm still under construction, but thanks for talking to me!");
		}
	}
});

client.login(process.env.DISCORD_TOKEN);
