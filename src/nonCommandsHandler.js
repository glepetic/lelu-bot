const bot = require(".././bot.js");

const client = bot.client;

function replyToMessage(message) {

    let content = message.content.toLowerCase();

    if (content.includes("gay")
        || content.includes("puto")
        || content.includes("homo")) {
        message.react("🌈");
    }

    if (content.includes("dark")) {
        const reaction = client.emojis.find(emoji => emoji.name === "darkhomosb");
        message.react(reaction);
    }

    if (content.includes("pog")) {
        const reaction = client.emojis.find(emoji => emoji.name === "gogsb");
        message.react(reaction);
    }

    if (content.includes("shoro")
        || content.includes("cry")) {
        message.channel.send("<:shorosb:528315164592832533>");
    }

    if (content.includes("dance")) {
        message.channel.send("<a:wobblesb:528743238035570710>");
    }

    if (content.includes("yay")
        || content.includes("party")) {
        message.channel.send("<a:jedipepesb:528698799187558421>");
    }

    if (content.includes("do u kno da wae")) {
        message.channel.send("i kno da wae mai broda", new bot.discord.Attachment(bot.appRoot + "/public/img/dawae.jpg"));
    }

    if (content.includes("racist")) {
        message.channel.send("<:trihard7sb:532388163440607243>");
    }

    if (content.includes("nigga")) {
        const reaction = client.emojis.find(emoji => emoji.name === "cmonbruhsb");
        message.react(reaction);
    }

}

exports.replyToMessage = replyToMessage;
