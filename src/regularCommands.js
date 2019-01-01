const bot = require(".././bot.js");
const osuCommands = require("./osu/osuCommands.js");
const osuHelpers = require("./osu/helpers.js");
const helpers = require("./helpers.js");
const math = require("./math.js");
const osuDB = require("./db/osuDB.js");

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
			if(message.channel.members == null){
				message.channel.recipient.send(":v");
				return;
			}
            let randUser = message.channel.members.random().user;
            while(randUser.bot){
                randUser = message.channel.members.random().user;
            }
            // let dmPref = helpers.getDMPref(randUser.id);
            let msg;
            // if(dmPref){
            if(true){
                randUser.send("You are ultra gay");
                msg = "Told **" + randUser.username + "** how gay they are";
            }else{
                msg = "**" + randUser.username + "** has direct messages disabled."
            }
            message.channel.send(msg);
            return;
        }
        if(usersToPm.array().length > 4){
            message.channel.send("Maximum mentions is 5...Chill bruh");
            return;
        }

        // let nonBots = usersToPm.filter(u => !u.bot);
        // let enabledDMsUsers = nonBots.filter(u => helpers.getDMPref(u));
        let enabledDMsUsers = usersToPm;

        enabledDMsUsers.forEach(user => {
            if(!user.bot) user.send("You are ultra gay");
        });

        message.channel.send("They indeed are.");

    },
    dm : function(message, flag){
        let userId = message.author.id;
        switch(flag){
            case "switch" :
                let dmPref = helpers.getDMPref(userId);
                helpers.setDMPref(!dmPref);
                break;
            default :
                message.channel.send("Please follow template: !dm switch");
                break;
        }


    },
    osu : function(message, args){
        let cmd = args[0];
        let user;
        switch(cmd){
            case "register":
                if(args[1] == null){
                    message.channel.send("Please follow template: !osu register < -f | -n > <username>");
                    return;
                }
                let flag = args[1].substring(1);
                let force;
                switch(flag){
                    case "f" :
                       force = true;
                       break;
                    case "n" :
                        force = false;
                        break;
                    default :
                        message.channel.send("Please follow template: !osu register < -f | -n > <username>");
                        return;
                }
                user = helpers.getUsername(args, 2);
                osuCommands.register(message, user, force);
                break;
            case "recent":
                user = helpers.getUsername(args, 1);
                if(user == null){
                    let found = false;
                    bot.mongoose.connect(bot.mongoURL + "osu", {useNewUrlParser : true});
                    let db = bot.mongoose.connection;
                    db.on("error", console.error.bind(console, 'connection error:'));
                    db.once("open", async function() {
                        let query;
                        try {
                            query = osuDB.User.findOne({_id : message.author.id});
                        }catch(err){
                            console.error(err);
                            return;
                        }

                        query.exec(async function(err, userRet){
                            if(err){
                                console.error(err);
                                return;
                            }
                            let uR = await userRet;
                            if(uR != null){
                                found = true;
                                osuCommands.recent(message, uR.osu);
                            }else{
                                message.channel.send("You are not registered! Use !osu register for more info.");
                            }
                        });

                    })
                    break;
                };

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
	    let recipient = message.channel.recipient;
	    if(message.channel.recipient != null){
		    let userCreation = recipient.createdAt;
		    age = math.dayDifference(userCreation, now);
		    reply = "Your user ";
	    }else{
		    
                    let guildCreation = message.guild.createdAt;
                    age = math.dayDifference(guildCreation, now);
                    reply = "The server ";
	    }
        }else{
            let userCreation = mentionedUser.createdAt;
            age = math.dayDifference(userCreation, now);
            reply = mentionedUser.toString() + " ";
        }
        let ageInYears = age/365.25;
        let years = parseInt(ageInYears);
        let ageMinusYearsInMonths = (ageInYears - years)*12;
        let months = parseInt(ageMinusYearsInMonths);
        let ageMinusYearsAndMonthsInDays = (ageMinusYearsInMonths - months)*365.25/12;
        let days = parseInt(ageMinusYearsAndMonthsInDays);

        reply = reply + "was created" + years + " years, " + months + " months and " + days + " days ago";

        message.channel.send(reply);

    },
    p : function(message, text, user){
        let percent = Math.round(Math.random()*100);
        message.channel.send(user + " is " + percent + "% " + text);
    },
    help : function (message) {
        let embed= new bot.discord.RichEmbed();
        embed.setTitle("Commands");
        embed.addField("!osu recent -username-", "Brings the most recent play by the user");
        embed.addField("!gay:","nothing else to say.");
        embed.addField("!age:","check your server/user age!");
        embed.addField("!p:","rng number from 0-100");
        message.channel.send(embed);

    }
}
