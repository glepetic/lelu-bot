const bot = require(".././bot.js");
const client = bot.client;

module.exports = {
    replyToMessage : function(message){

        let content = message.content;

        if(content.includes("gay")
            || content.includes("puto")
            || content.includes("Gay")
            || content.includes("Puto")
            || content.includes("homo")
            || content.includes("Homo")){
            message.react("🌈");
        }

        if(content.includes("dark")
            || content.includes("Dark")){
            const reaction = client.emojis.find(emoji => emoji.name === "darkhomosb");
            message.react(reaction);
        }

        if(content.includes("pog")
            || content.includes("Pog")){
            const reaction = client.emojis.find(emoji => emoji.name === "gogsb");
            message.react(reaction);
        }

        if(content.includes("shoro")
            || content.includes("Shoro")
            || content.includes("cry")
            || content.includes("Cry")){
            message.channel.send("<:shorosb:528315164592832533>");
        }

        if(content.includes("bot")
            || content.includes("Bot")
            || content.includes("wobble")
            || content.includes("Wobble")){
            message.channel.send("<a:wobblesb:528743238035570710>");
        }

        if(content.includes("yay")
            || content.includes("Yay")
            || content.includes("dance")
            || content.includes("Dance")){
            message.channel.send("<a:jedipepesb:528698799187558421>");
        }
		
		if(content.includes("do u kno da wae")){
			message.channel.send("i kno da wae mai broda", {file : bot.appRoot + "/public/img/dawae.jpg"});
		}

    }
}
