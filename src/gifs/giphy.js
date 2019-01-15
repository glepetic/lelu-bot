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