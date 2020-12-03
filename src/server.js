'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log("Ready!");
});

client.on('message', message => {
	handleMessage(message);
});

client.login(process.env.DISCORD_TOKEN);

async function handleMessage(message) {
	const content = await parseMessage(message);
	const invoked = await wasInvoked(content);
	if (invoked) {
		await handleInvoke(message, content);
	}
}

async function parseMessage(message) {
	return message.content.toLowerCase();
}

async function wasInvoked(content) {
	return content.startsWith("june") || content.startsWith("j!");
}

async function handleInvoke(message, content) {
	if (content.endsWith('help')) {
		message.reply("I don't have a lot of options yet. Here they are:");
		const help = new Discord.MessageEmbed()
			.setTitle("June's commands")
			.addField('Addressing June', 'You can ask June by typing "june", "June", "j!" or "J!".')
			.addField("`j!help`, `June help`", "Ask for help (this command!)");
		await message.channel.send(help);
	} else if (content.endsWith('cat')) {
		// load cat
	} else if (content.endsWith('dog')) {
		// load dog
	} else {
		message.reply("I'm still under construction, but thanks for talking to me!");
	}
}
