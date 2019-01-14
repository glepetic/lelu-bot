const bot = require("../../bot.js");
const markdown = require("../discord/markdown.js");
const actions = require("./actions.js");

function giphyRandom(word){

    return bot.giphy.random(word);

}

function giphySearch(word, limit){

    return bot.giphy.search({q: word, limit: limit});

}

function sendGiphyEmbed(message, word, limit, user){

    let embed = new bot.discord.RichEmbed();

    let action = actions.get(word);

    giphySearch(word, limit).then(gifs => {
        let position = Math.round(Math.random()*(limit - 1));
        embed.setDescription(markdown.bold(message.author + " has " + action + " " + user + " !"));
        embed.setImage(gifs.data[position].images.original.url);
        message.channel.send(embed);
    });

}

function kiss(message){

    let mentioned = message.mentions.users.first();

    if(mentioned == null){
        message.channel.send("This command has invalid arguments. Please use !help for more information.");
        return;
    }

    sendGiphyEmbed(message, "anime kiss", 25, mentioned);

}

function hug(message){

    let mentioned = message.mentions.users.first();

    if(mentioned == null){
        message.channel.send("This command has invalid arguments. Please use !help for more information.");
        return;
    }

    sendGiphyEmbed(message, "anime hug", 25, mentioned);

}

exports.kiss = kiss;
exports.hug = hug;