const Discord = require("discord.js");
const osu = require("osu-api");
const req = require("request");
const Big = require("big.js");
const mongo = require("mongoose");
const mongoLong = require("mongodb").Long;
require("mongoose-long")(mongo);
const giphy = require("giphy-api")("eorufO1ywQLZqjiHbk2vpBcw95hYAsDx");


exports.osuApi = new osu.Api("3154dc707474e9590e5cd57c6b3de1f6e5e1a0f3");
exports.startTime = new Date();
exports.mongoose = mongo;
exports.Long = mongoLong;
exports.client = new Discord.Client();
exports.discord = Discord;
exports.request = req;
exports.bigNumbers = Big;
exports.appRoot = __dirname;
exports.giphy = giphy;

//databases init
require("./src/amadeus/db.js").init;

const bot = require("./bot.js");
const config = require("./settings/config.json");
const commandsHandler = require("./src/commandsHandler.js");
const nonCommandsHandler = require("./src/nonCommandsHandler.js");
const markdown = require("./src/discord/markdown.js");

// Set the prefix
const prefix = config.prefix;

let gameMessage;

bot.client.on('ready', () => {

    gameMessage = "on " + bot.client.guilds.array().length + " servers";

    // set status
    bot.client.user.setStatus(config.presence); // Change from settings/config.json
    bot.client.user.setActivity("on " + bot.client.guilds.array().length + " servers");

    let guildOwners = bot.client.guilds.map(guild => guild.owner);
    exports.owner = guildOwners.find(owner => owner.id == new Big("500036526546223106"));

    console.log('Your Bot is Online')

});


bot.client.on("guildCreate", guild => {
    bot.client.user.setActivity("on " + bot.client.guilds.array().length + " servers");
    let defaultChannel = guild.channels.filter(channel => channel.type === "text").first();
    defaultChannel.send("Hello! Thanks for inviting me <a:wobblesb:528743238035570710>");
    defaultChannel.send("Use !help if you need command information.");
});

bot.client.on("guildDelete", (guild) => {
    bot.client.user.setActivity("on " + bot.client.guilds.array().length + " servers");
});

bot.client.on("guildMemberAdd", member =>{
   let defaultChannel = member.guild.channels.filter(channel => channel.type === "text").first();
   defaultChannel.send("Some noob called " + markdown.bold(member.displayName) + " has appeared!");
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