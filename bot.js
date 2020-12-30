const Discord = require("discord.js");
const osu = require("osu-api");
const req = require("request");
const Big = require("big.js");
const mongo = require("mongoose");
const mongoLong = require("mongodb").Long;
require("mongoose-long")(mongo);
const giphy = require("giphy-api")(process.env.GIPHY_API_TOKEN);


exports.osuApi = new osu.Api(process.env.OSU_API_TOKEN);
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
const prefix = process.env.DISCORD_BOT_COMMAND_PREFIX;

function getBotServers() {
    return bot.client.guilds.array().length;
}

function getGameMessage() {
    return "on " + getBotServers() + " servers"
}

bot.client.on('ready', () => {

    // set status
    bot.client.user.setStatus(config.presence); // Change from settings/config.json
    bot.client.user.setActivity(getGameMessage());

    bot.client
        .fetchUser(config.ownerID)
        .then(u => exports.owner = u);

    console.log('Your Bot is Online')

});


bot.client.on("guildCreate", guild => {
    bot.client.user.setActivity(getGameMessage());
    let defaultChannel = guild.channels.filter(channel => channel.type === "text").first();
    defaultChannel.send("Hello! Thanks for inviting me :)");
    defaultChannel.send("Use !help if you need command information.");
});

bot.client.on("guildDelete", (guild) => {
    bot.client.user.setActivity(getGameMessage());
});

bot.client.on("guildMemberAdd", member => {
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

const bot_token = process.env.DISCORD_BOT_TOKEN;
console.log(bot_token);
//Login to your bot edit the config file on settings folder
bot.client.login(bot_token)
    .then(some => console.log("Logged in!"))
    .catch(err => console.error(err));