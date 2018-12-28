var bot = require(".././bot.js");
var osuCommands = require("./osu/osuCommands.js");
var osuHelpers = require("./osu/helpers.js");
var helpers = require("./helpers.js");
var math = require("./math.js");

module.exports = {
    requests : function(message){
        var embed = new bot.discord.RichEmbed();
        embed.setTitle("Click here for command requests...");
        embed.setURL("https://docs.google.com/document/d/1GUM-9I7AcX34UQiImTN9ADUwOgvjV8RsL6_IKwUjNaw/edit?usp=sharing");
        message.channel.send(embed);
        message.channel.send("<:pikasb:528038230692462602>");
    },
	worms : function(message){
				if(message.member == null) return;
		var voiceChannel = message.member.voiceChannel;
		if(voiceChannel  == null) return;
		voiceChannel.join().then(connection => {
			var dispatcher = connection.playFile(bot.appRoot + "/public/audio/meMuero.mp3");
			dispatcher.on("end", end => {
				voiceChannel.leave();
			});
		}).catch(console.error);
	},
    gay : function(message){
        var mentionedPeople = message.mentions.users;
        if(mentionedPeople.first() == null){
            message.channel.send("Who is gay?");
            return;
        }
        mentionedPeople.array().forEach((user) => {
            if(!user.bot) user.send("You are ultra gay");
        });
    },
    osu : function(message, args){
        var cmd = args[0];
        switch(cmd){
            case "register":
                var discordUserId = message.author.id;
                var result = osuHelpers.findUser(discordUserId);
                if(result != null){
                    message.channel.send("You are already registered as " + result + ". Use 'register-force' to change your user associated.");
                    return;
                }
                var user = helpers.getUsername(args, 1);
                if(user == null) message.channel.send("Please indicate the username to register");
                //todo
                break;
            case "recent":
                var user = helpers.getUsername(args, 1);
                if(user == null) break;
                osuCommands.recent(message, user);
                break;
        }
    },
    age : function(message){
	    var mentionedUser = message.mentions.users.first();
	    var now = new Date();
	    var age;
	    var reply;
        if(mentionedUser == null){
            var guildCreation = message.guild.createdAt;
            age = math.dayDifference(guildCreation, now);
            reply = "The server was created ";
        }else{
            var userCreation = mentionedUser.createdAt;
            age = math.dayDifference(userCreation, now);
            reply = mentionedUser.toString() + " was created ";
        }
        var ageInYears = age/365.25;
        var years = parseInt(ageInYears);
        var ageMinusYearsInMonths = (ageInYears - years)*12;
        var months = parseInt(ageMinusYearsInMonths);
        var ageMinusYearsAndMonthsInDays = (ageMinusYearsInMonths - months)*365.25/12;
        var days = parseInt(ageMinusYearsAndMonthsInDays);

        reply = reply + years + " years, " + months + " months and " + days + " days ago";

        message.channel.send(reply);

    }

}