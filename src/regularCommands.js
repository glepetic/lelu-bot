var bot = require("./bot.js");
var osuCommands = require("./osu/osuCommands.js");

module.exports = {
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
            case null:
                break;
            case "recent":
                var user = args[1];
                if(user == null) break;
                var i;
                user = user + " ";
                for(i=2; i<args.length; i++){
                    user = user + args[i] + " ";
                }
                osuCommands.recent(message, user);
                break;
        }
    }
}