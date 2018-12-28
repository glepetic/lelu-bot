var bot = require("../.././bot.js");
var osuApi = bot.osuApi;
var osuMath = require("./math.js");
var osuHelpers = require("./helpers.js");

module.exports = {
    recent : function(message, user){

        osuApi.getUser(user,
            function(err, userJSON){
				if(userJSON == null){
					message.channel.send("The player " + user + " does not exist.");
					return;
				}
                var username = userJSON["username"];

                osuApi.getUserRecent(user,
                    function(err, recentScores){
                        if(recentScores[0] == null){
                            message.channel.send("This player has not played in the last 24 hours.");
                            return;
                        }

                        osuApi.getBeatmap(recentScores[0]["beatmap_id"],
                            function(err, beatMap){

                                count50s = recentScores[0]["count50"];
                                count100s = recentScores[0]["count100"];
                                count300s = recentScores[0]["count300"];
                                countmiss = recentScores[0]["countmiss"];

                                var url = "https://osu.ppy.sh/b/" + recentScores[0]["beatmap_id"];

                                bot.request(url, {json : true}, (err, res, body) => {
                                    if(err){return console.log(err)};
                                var linkForImageId = res.toJSON()["request"]["uri"]["href"];
                                var subLink = linkForImageId.substring(31);
                                var splitImg = subLink.split("#");

                                var embed = new bot.discord.RichEmbed();
                                embed.setTitle("__**" + beatMap.title + " [" + beatMap.version + "]" + "**__");
                                embed.setURL(url);
                                embed.setThumbnail("https://b.ppy.sh/thumb/" + splitImg[0] + "l.jpg");
                                embed.addField("Rank", osuHelpers.determinateRank(recentScores[0].rank), true);
                                embed.addField("Accuracy", Math.round(osuMath.calculateAccuracy(count50s, count100s, count300s, countmiss)*100)/100 + "%", true);
                                embed.addField("Player", "[" + username + "](https://osu.ppy.sh/users/" + recentScores[0]["user_id"] + ")");
                                embed.addField("Difficulty", Math.round(beatMap["difficultyrating"]*100)/100 + "⭐", true);
                                //TODO: generate used mods from id
                                // var mods = osuHelpers.generateModsString(recentScores[0]["enabled_mods"]);
                                // embed.addField("Mods", mods, true);
                                embed.addField("Mods", recentScores[0]["enabled_mods"], true);
                                embed.addField("300s", count300s, true);
                                embed.addField("100s", count100s, true);
                                embed.addField("50s", count50s, true);
                                embed.addField("Misses", countmiss, true);
                                var minSincePlay = osuMath.calculateTimeSincePlay(recentScores[0].date);
                                var hours = parseInt(minSincePlay/60);
                                var minutes = minSincePlay - hours*60;
                                var footer = osuHelpers.generateTimeFooter(hours, minutes);
                                embed.setFooter(footer);

                                message.channel.send(embed);

                            });

                        });

                    });

        });

    }
}