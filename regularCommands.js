var bot = require("./bot.js");
var osuApi = bot.osuApi;

module.exports = {
    gay : function(message){
        var mentionedPeople = message.mentions.users;
        if (mentionedPeople.first() == null) return;
        message.delete();
        message.channel.messages.array().pop();
        mentionedPeople.array().forEach((user) => user.send("Sos puto"));
    },
    recent : function(message, user){

       osuApi.getUserRecent(user,
           function(err, recentScores){
                if(recentScores[0] == null){
                    message.channel.send("This player has not played in the last 24 hours.");
                    return;
                }

                //message.channel.send("https://assets.ppy.sh/beatmaps/" + recentScores[0]["beatmap_id"] + "/covers/cover.jpg\n");

                osuApi.getBeatmap(recentScores[0]["beatmap_id"],
                    function(err, beatMap){

                        var embed = new bot.discord.RichEmbed();
                        embed.setTitle("__**" + beatMap.title + "**__");
                        embed.setURL("https://osu.ppy.sh/b/" + recentScores[0]["beatmap_id"]);
                        //TODO: obtain id of picture from old.ppy
                        embed.setThumbnail("https://b.ppy.sh/thumb/881764l.jpg");
                        embed.addField("Rank", recentScores[0].rank);
                        embed.addField("Player", "[" + user + "](https://osu.ppy.sh/users/" + recentScores[0]["user_id"] + ")");
                        embed.addField("Difficulty", Math.round(beatMap["difficultyrating"]*100)/100 + "⭐", true);
                        //TODO: generate used mods from id
                        embed.addField("Mods", recentScores[0]["enabled_mods"], true);
                        embed.addField("300s", recentScores[0]["count300"], true);
                        embed.addField("100s", recentScores[0]["count100"], true);
                        embed.addField("50s", recentScores[0]["count50"], true);
                        embed.addField("Misses", recentScores[0]["countmiss"], true);
                        embed.addField("Date", recentScores[0].date);

                        message.channel.send(embed);


                    });

            });


    }
}