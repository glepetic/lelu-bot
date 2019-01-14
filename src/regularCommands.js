const bot = require(".././bot.js");
const osuCommands = require("./osu/osuCommands.js");
const markdown = require("./discord/markdown.js");
const helpers = require("./helpers.js");
const math = require("./math.js");
const osuDB = require("./amadeus/osuDB.js");


function requests(message) {
    let embed = new bot.discord.RichEmbed();
    embed.setTitle("Click here for command requests...");
    embed.setURL("https://docs.google.com/document/d/1GUM-9I7AcX34UQiImTN9ADUwOgvjV8RsL6_IKwUjNaw/edit?usp=sharing");
    message.channel.send(embed);
    message.channel.send("<:pikasb:528038230692462602>");
}

function worms(message) {
    if (message.member == null) return;
    let voiceChannel = message.member.voiceChannel;
    if (voiceChannel == null) return;
    voiceChannel.join().then(connection => {
        let dispatcher = connection.playFile(bot.appRoot + "/public/audio/meMuero.mp3");
        dispatcher.on("end", end => {
            voiceChannel.leave();
        });
    }).catch(console.error);
}

function gay(message) {
    let usersToPm = message.mentions.users;
    if (usersToPm.first() == null) {
        if (message.channel.members == null) {
            message.channel.recipient.send(":v");
            return;
        }
        let randUser = message.channel.members.random().user;
        while (randUser.bot) {
            randUser = message.channel.members.random().user;
        }
        // let dmPref = helpers.getDMPref(randUser.id);
        let msg;
        // if(dmPref){
        if (true) {
            randUser.send("You are ultra gay");
            msg = "Told **" + randUser.username + "** how gay they are";
        } else {
            msg = "**" + randUser.username + "** has direct messages disabled."
        }
        message.channel.send(msg);
        return;
    }
    if (usersToPm.array().length > 4) {
        message.channel.send("Maximum mentions is 5...Chill bruh");
        return;
    }

    // let nonBots = usersToPm.filter(u => !u.bot);
    // let enabledDMsUsers = nonBots.filter(u => helpers.getDMPref(u));
    let enabledDMsUsers = usersToPm;

    enabledDMsUsers.forEach(user => {
        if (!user.bot) user.send("You are ultra gay");
    });

    message.channel.send("They indeed are.");

}

function dm(message, flag) {
    let userId = message.author.id;
    switch (flag) {
        case "switch" :
            let dmPref = helpers.getDMPref(userId);
            helpers.setDMPref(!dmPref);
            break;
        default :
            message.channel.send("Please follow template: !dm <enable|disable>");
            break;
    }


}

function osu(message, args) {
    let cmd = args[0];
    let user;
    switch (cmd) {
        case "help":
            if(!helpers.checkNull(message, args[1])) break;
            osuCommands.help(message);
            break;
        case "register":
            user = helpers.getUsername(args, 1);
            osuCommands.register(message, user);
            break;

        case "recent":
            user = helpers.getUsername(args, 1);
            if (user == null) {
                osuDB.handleRequest(message, osuCommands.recent);
                break;
            }
            osuCommands.recent(message, user);
            break;

        case "best":
            user = helpers.getUsername(args, 1);
            if (user == null) {
                osuDB.handleRequest(message, osuCommands.best);
                break;
            }
            osuCommands.best(message, user);
            break;

        case "wasted":
            user = helpers.getUsername(args, 1);
            if (user == null) {
                osuDB.handleRequest(message, osuCommands.wasted);
                break;
            }
            osuCommands.wasted(message, user);
            break;
    }
}

function age(message) {
    let mentionedUsers = message.mentions.users;
    let mentionedUser = mentionedUsers.first();
    let seconds;
    let time;
    let age;
    let reply;
    if (mentionedUser == null) {
        let recipient = message.channel.recipient;
        if (message.channel.recipient != null) {
            let userCreation = recipient.createdAt;
            seconds = math.secondsSinceDate(userCreation);
            reply = "Your user ";
        } else {
            let guildCreation = message.guild.createdAt;
            seconds = math.secondsSinceDate(guildCreation);
            reply = "The server ";
        }

        time = math.secondsToTimeArray(seconds);
        age = helpers.generateTimeString(time);

        reply = reply + "was created " + age + " ago";

        message.channel.send(reply);
    } else {
        mentionedUsers.forEach(user => {
            let userCreation = user.createdAt;
            seconds = math.secondsSinceDate(userCreation);
            if (user.id == new bot.bigNumbers.Big("525097268764737536")) {
                reply = "I ";
            } else if (user.id == message.author.id) {
                reply = "Your user ";
            } else {
                reply = user.toString() + " ";
            }

            time = math.secondsToTimeArray(seconds);
            age = helpers.generateTimeString(time);

            reply = reply + "was created " + age + " ago";

            message.channel.send(reply);

        });

    }


}

function p(message, text, user) {
    let percent = Math.round(Math.random() * 100);
    message.channel.send(user + " is " + percent + "% " + text);
}

function help(message) {
    let embed = new bot.discord.RichEmbed();
    embed.setTitle("Amadeus Help");
    embed.setDescription("Amadeus provides a wide range of functionality including commands for rng, gifs, voice, league of legends, osu and more!");
    embed.setColor(13977185);
    embed.setThumbnail(bot.client.user.displayAvatarURL);
    embed.addField("Key", helpers.getKey());
    embed.addField("Commands", helpers.getCommands());
    embed.setFooter("Created by " + bot.owner.user.tag, bot.owner.user.displayAvatarURL);
    embed.setTimestamp(bot.client.user.createdAt);
    message.author.send(embed);

}

function uptime(message) {
    let seconds = math.secondsSinceDate(bot.startTime);
    let time = math.secondsToTimeArray(seconds);
    let uptime = helpers.generateTimeString(time);
    message.channel.send("I have been online for " + uptime);
}

function roll(message, limit) {
    if (limit == null) limit = 100;
    let range = parseInt(limit);
    if (isNaN(range)) {
        message.channel.send(markdown.bold(limit) + " is not a number!");
        return;
    }
    let points = Math.round(Math.random() * range);
    message.channel.send("You have rolled " + points + " points!");
}

exports.requests = requests;
exports.worms = worms;
exports.gay = gay;
exports.age = age;
exports.p = p;
exports.osu = osu;
exports.dm = dm;
exports.help = help;
exports.uptime = uptime;
exports.roll = roll;
