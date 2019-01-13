const Discord = require("discord.js");
const osu = require("osu-api");
const req = require("request");
const fsFunc = require("fs");
const big = require("big.js");
const mongo = require("mongoose");
const mongoLong = require("mongodb").Long;
require("mongoose-long")(mongo);

exports.osuApi = new osu.Api("3154dc707474e9590e5cd57c6b3de1f6e5e1a0f3");
exports.startTime = new Date();
exports.mongoose = mongo;
exports.mongoURL = "mongodb+srv://sucre:Lgo**2019!@sb-v30sa.mongodb.net/";
exports.Long = mongoLong;
exports.client = new Discord.Client();
exports.discord = Discord;
exports.request = req;
exports.bigNumbers = big;
exports.appRoot = __dirname;
exports.fs = fsFunc;

//databases init
require("./src/db/osuDB.js").init;

const bot = require("./bot.js");
const config = require("./settings/config.json");
const commandsHandler = require("./src/commandsHandler.js");
const nonCommandsHandler = require("./src/nonCommandsHandler.js");

// Set the prefix
const prefix = config.prefix;

bot.client.on('ready', () => {

    // set status
    bot.client.user.setStatus("online", config.presence); // Change from settings/config.json
    bot.client.user.setActivity("on " + bot.client.guilds.array().length + " servers");
    console.log('Your Bot is Online')
});


bot.client.on("guildCreate", (guild) => {
    bot.client.user.setActivity("on " + bot.client.guilds.array().length + " servers");
    //TODO welcome message
});

bot.client.on("guildDelete", (guild) => {
    bot.client.user.setActivity("on " + bot.client.guilds.array().length + " servers");
    //TODO welcome message
});

bot.client.on("message", (message) => {
    // Exit and stop if the prefix is not there or if user is a bot
    if (message.author.bot) return;

    nonCommandsHandler.replyToMessage(message);

    if (message.content.startsWith(prefix)) {

        let msgLength = message.content.length;
        let parameters = message.content.substring(1, msgLength);
        let args = parameters.split(' ');

        commandsHandler.executeCommand(message, args);

        if (message.member == null) return;

        commandsHandler.executeAdminCommand(message, args);

    }

});


//Login to your bot edit the config file on settings folder
bot.client.login(config.token);