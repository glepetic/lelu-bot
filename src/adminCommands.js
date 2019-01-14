const bot = require(".././bot.js");
const helpers = require("./helpers.js");

function purge(message, qty) {
    let messages = message.channel.messages.array();
    let len = messages.length;
    if (qty == null) {
        message.channel.send("Please provide the number of messages to delete.");
        return;
    }
    if (qty <= 0) {
        message.channel.send("Why did you even bother writing? 🤦🏼‍");
        return;
    }
    if (len == 1) {
        message.channel.send("There are no messages left to delete...");
        return;
    }
    if (qty >= len) {
        messages.forEach(msg => msg.delete());
        message.channel.send("A total of " + (len - 1).toString() + " messages will be deleted.");
        return;
    }
    qty++;
    let i;
    let totalDeleted = -1;
    for (i = len - 1; len - qty <= i; i--) {
        messages[i].delete();
        messages.pop();
        totalDeleted++;
    }
    message.channel.send("A total of " + totalDeleted.toString() + " messages will be deleted.");
}


function help(message) {
    let embed = new bot.discord.RichEmbed();
    embed.setTitle("Amadeus Admin Help");
    embed.setDescription("Here is a list of commands only available to admins.");
    embed.setColor(13977185);
    embed.setThumbnail(bot.client.user.displayAvatarURL);
    embed.addField("Key", helpers.getKey());
    embed.addField("Commands", helpers.getAdminCommands());
    embed.setFooter("Created by " + bot.owner.user.tag, bot.owner.user.displayAvatarURL);
    embed.setTimestamp(bot.client.user.createdAt);
    message.author.send(embed);

}


exports.purge = purge;
exports.help = help;