const bot = require("../.././bot.js");
const markdown = require("../discord/markdown.js");
const actions = require("./actions.js");

function sendLocalEmbed(message, word, limit, user){

    let action = actions.get(word);

    let random = Math.random();
    let number = Math.round(random*(limit-1) + 1);
    let photoName = word + number + ".gif";

    let embed = new bot.discord.RichEmbed();
    let attachment = new bot.discord.Attachment(bot.appRoot + "/public/gif/" + photoName, photoName);
    embed.setDescription(markdown.bold(message.author + " has " + action + " " + user + " !"));
    embed.attachFile(attachment);
    embed.setImage("attachment://" + photoName);
    message.channel.send({embed});

}

function kiss(message){

    let mentioned = message.mentions.users.first();

    if(mentioned == null){
        message.channel.send("This command has invalid arguments. Please use !help for more information.");
        return;
    }

    sendLocalEmbed(message, "kiss", 25, mentioned);

}

function hug(message){

    let mentioned = message.mentions.users.first();

    if(mentioned == null){
        message.channel.send("This command has invalid arguments. Please use !help for more information.");
        return;
    }

    sendLocalEmbed(message, "hug", 25, mentioned);

}

function slap(message){

    let mentioned = message.mentions.users.first();

    if(mentioned == null){
        message.channel.send("This command has invalid arguments. Please use !help for more information.");
        return;
    }

    sendLocalEmbed(message, "slap", 25, mentioned);

}

function lick(message){

    let mentioned = message.mentions.users.first();

    if(mentioned == null){
        message.channel.send("This command has invalid arguments. Please use !help for more information.");
        return;
    }

    sendLocalEmbed(message, "lick", 25, mentioned);

}


exports.hug = hug;
exports.kiss = kiss;
exports.lick = lick;
exports.slap = slap;