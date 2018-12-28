var bot = require(".././bot.js");
var osuCommands = require("./osu/osuCommands.js");
var osuHelpers = require("./osu/helpers.js");
var helpers = require("./helpers.js");

module.exports = {
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
        if(mentionedPeople.first() == null) return;
        mentionedPeople.array().forEach((user) => {
            if(!user.bot) user.send("You are so gay");
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
    }
}