const bot = require(".././bot.js");
const osuCommands = require("./osu/osuCommands.js");
const osuHelpers = require("./osu/helpers.js");
const helpers = require("./helpers.js");
const math = require("./math.js");

module.exports = {
    requests : function(message){
        let embed = new bot.discord.RichEmbed();
        embed.setTitle("Click here for command requests...");
        embed.setURL("https://docs.google.com/document/d/1GUM-9I7AcX34UQiImTN9ADUwOgvjV8RsL6_IKwUjNaw/edit?usp=sharing");
        message.channel.send(embed);
        message.channel.send("<:pikasb:528038230692462602>");
    },
	worms : function(message){
				if(message.member == null) return;
		let voiceChannel = message.member.voiceChannel;
		if(voiceChannel  == null) return;
		voiceChannel.join().then(connection => {
			let dispatcher = connection.playFile(bot.appRoot + "/public/audio/meMuero.mp3");
			dispatcher.on("end", end => {
				voiceChannel.leave();
			});
		}).catch(console.error);
	},
    gay : function(message){
        let usersToPm = message.mentions.users;
        if(usersToPm.first() == null){
            let array = message.channel.members.array()
            let len = array.length;
            let randPosition = Math.random()*(len-1);
            let randUser = array[randPosition];
            randUser.send("You are ultra gay");
            message.channel.send("Told **" + randUser.nickname + "** how gay he is");
            return;
        }
        if(usersToPm.array().length > 4){
            message.channel.send("Maximum mentions is 5...Chill bruh");
            return;
        }

        usersToPm.forEach(user => {
            if(!user.bot) user.send("You are ultra gay");
        });

        message.channel.send("They indeed are.");

    },
    osu : function(message, args){
        let cmd = args[0];
        let user;
        switch(cmd){
            case "register":
                let discordUserId = message.author.id;
                let result = osuHelpers.findUser(discordUserId);
                if(result != null){
                    message.channel.send("You are already registered as " + result + ". Use 'register-force' to change your user associated.");
                    return;
                }
                user = helpers.getUsername(args, 1);
                if(user == null) message.channel.send("Please indicate the username to register");
                //todo
                break;
            case "recent":
                user = helpers.getUsername(args, 1);
                if(user == null) break;
                osuCommands.recent(message, user);
                break;
        }
    },
    age : function(message){
	    let mentionedUser = message.mentions.users.first();
	    let now = new Date();
	    let age;
	    let reply;
        if(mentionedUser == null){
            let guildCreation = message.guild.createdAt;
            age = math.dayDifference(guildCreation, now);
            reply = "The server was created ";
        }else{
            let userCreation = mentionedUser.createdAt;
            age = math.dayDifference(userCreation, now);
            reply = mentionedUser.toString() + " was created ";
        }
        let ageInYears = age/365.25;
        let years = parseInt(ageInYears);
        let ageMinusYearsInMonths = (ageInYears - years)*12;
        let months = parseInt(ageMinusYearsInMonths);
        let ageMinusYearsAndMonthsInDays = (ageMinusYearsInMonths - months)*365.25/12;
        let days = parseInt(ageMinusYearsAndMonthsInDays);

        reply = reply + years + " years, " + months + " months and " + days + " days ago";

        message.channel.send(reply);

    },
    p : function(message, text, user){
        let percent = Math.round(Math.random()*100);
        message.channel.send(user + " is " + percent + "% " + text);
    }

}