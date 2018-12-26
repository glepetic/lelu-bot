var bot = require("./bot.js");
var client = bot.client;

module.exports = {
    replyToMessage : function(message){

        var content = message.content;

        if(content.includes("gay")
            || content.includes("puto")
            || content.includes("Gay")
            || content.includes("Puto")
            || content.includes("homo")
            || content.includes("Homo")){
            message.react("🌈");

        }

        if(content.includes("dark")){
            const reaction = client.emojis.find(emoji => emoji.name === "darkhomo");
            message.react(reaction);
        }

    }
}