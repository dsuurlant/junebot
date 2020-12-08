'use strict';

const express = require("express");
const discord = require('discord.js');
const querystring = require('querystring');
const axios = require('axios');
const client = new discord.Client();
const app = express();

// Basic listening server that discord attaches to
app.listen(process.env.PORT, () => {
    console.log("Listening to port: " + process.env.PORT);
})

client.once('ready', () => {
    console.log("Discord client connected and ready!");
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
        await sendHelp(message);
    } else if (content.endsWith('cat')) {
        await sendCat(message);
    } else if (content.endsWith('dog')) {
        await sendDog(message);
    } else if (content.endsWith('counting') || message.content.equals('jc!') || message.content.equals('jc!help')) {
        await sendCounterHelp(message);
    } else {
        message.reply("I'm still under construction, but thanks for talking to me!");
    }
}

async function sendCounterHelp(message) {
    message.reply("You asked about counting! Here is some more info. June Counter is in development and most of these commands won't work.");

    const countingHelp = new discord.MessageEmbed()
        .setTitle("June Counter Configuration")
        .setDescription("June can help you with a counting game!")
        .addField("`jc!`", "the counter basic command. Typing `jc!` without specifying anything else will also display this help.")
        .addField("`jc!channel`", "Set the current channel to the counting channel (preserves active count). Only allowed if you have 'Manage Channels' permission.")
        .addField("`jc!current`", "Get the current counter value.")
        .addField("`jc!server`", "Get the counter stats for this server.")
        .addField("`jc!user`", "Get the counter stats of message user.")
        .addField("`jc!save`", "Increases your saves by 0.2. You can do this twice a day for a max of 2.0.")
        .addField("`jc!gift @user`", "Gift save to specified user. You can only gift 1.0 save.")
        .addField("`jc!donate`", "Donate 0.2 of your saves to the server.");

    await message.channel.send(countingHelp);
}

async function sendHelp(message) {
    message.reply("I don't have a lot of options yet. Here they are:");
    const help = new discord.MessageEmbed()
        .setTitle("June's commands")
        .addField('Addressing June', 'You can ask June by typing "june", "June", "j!" or "J!".')
        .addField("`j!help`, `June help`", "Ask for help (this command!)")
        .addField("`j!cat`, `June cat`", "Ask June for a cat image!")
        .addField("`j!dog`, `June dog`", "Ask June for a dog image!")
        .addField("testing some stuff", "<ul><li>this is an item</li><li>this is another item</li></ul>");
    await message.channel.send(help);
}

async function sendCat(message) {
    await sendImage(message, 'cat');
}

async function sendDog(message) {
    await sendImage(message, 'dog');
}

async function sendImage(message, type) {
    const apiKey = type === 'cat' ? process.env.CAT_API_TOKEN : type === 'dog' ? process.env.DOG_API_TOKEN : null;
    const apiUrl = type === 'cat' ? process.env.CAT_API_URL : type === 'dog' ? process.env.DOG_API_URL : null;

    if (apiKey === null || apiKey === undefined || apiUrl === null || apiUrl === undefined) {
        message.reply("Sorry, I am not able to find any images of '" + type + "' for you.");
        throw Error("Could not find API Key or API Url for type '" + type + "'.");
    }

    const response = await loadImages(message.author.username, apiKey, apiUrl);

    // see fixtures/cat_api_example.json for response structure.
    const imageData = response.data[0];
    const breed = imageData.breeds[0];
    message.channel.send("This :" + type + ": is a **" + breed.name + "**! :heart:", {files: [imageData.url]});
}

/**
 * Based on https://github.com/AdenForshaw/theDogAPI-discord-bot/blob/master/index.js
 */
async function loadImages(username, apiKey, apiUrl) {
    const headers = {
        'X-API-KEY': apiKey
    }
    const queryParams = {
        'has_breeds': true,       // we only want images with at least one breed data object - name, temperament etc
        'mime_types': 'jpg,png',  // we only want static images as Discord doesn't like gifs
        'size': 'small',          // get the small images as the size is prefect for Discord's 390x256 limit
        'sub_id': username,       // pass the message senders username so you can see how many images each user has asked for in the stats
        'limit': 1                // only need one
    }

    const queryString = querystring.stringify(queryParams);
    const url = apiUrl + `?${queryString}`;

    return axios.get(url, {headers: headers});
}
