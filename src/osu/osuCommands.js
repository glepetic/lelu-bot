const bot = require("../.././bot.js");
const osuApi = bot.osuApi;
const osuMath = require("./math.js");
const osuHelpers = require("./helpers.js");
const math = require(".././math.js");

module.exports = {
    recent : function(message, user){

        let userObj = osuApi.user.get(user);
        message.channel.send(userObj.name + " " + userObj.userId + " " + userObj.rank);

        // osuApi.getUser(user,
        //     function(err, userJSON){
		// 		if(userJSON == null){
		// 			message.channel.send("The player " + user + " does not exist.");
		// 			return;
		// 		}
        //         let username = userJSON["username"];
        //
        //         osuApi.getUserRecent(user,
        //             function(err, recentScores){
        //                 if(recentScores[0] == null){
        //                     message.channel.send("This player has not played in the last 24 hours.");
        //                     return;
        //                 }
        //
        //                 osuApi.getBeatmap(recentScores[0]["beatmap_id"],
        //                     function(err, beatMap){
        //
        //                         let count50s = recentScores[0]["count50"];
        //                         let count100s = recentScores[0]["count100"];
        //                         let count300s = recentScores[0]["count300"];
        //                         let countmiss = recentScores[0]["countmiss"];
        //
        //                         let url = "https://osu.ppy.sh/b/" + recentScores[0]["beatmap_id"];
        //
        //                          bot.request(url, {json : true}, (err, res, body) => {
        //                             if(err){return console.log(err)};
        //                             let linkForImageId = res.toJSON()["request"]["uri"]["href"];
        //                             let subLink = linkForImageId.substring(31);
        //                             let splitImg = subLink.split("#");
        //
        //                             let embed = new bot.discord.RichEmbed();
        //                             embed.setTitle("__**" + beatMap.title + " [" + beatMap.version + "]" + "**__");
        //                             embed.setURL(url);
        //                             embed.setThumbnail("https://b.ppy.sh/thumb/" + splitImg[0] + "l.jpg");
        //                             embed.addField("Rank", osuHelpers.determinateRank(recentScores[0].rank), true);
        //                             embed.addField("Accuracy", Math.round(osuMath.calculateAccuracy(count50s, count100s, count300s, countmiss)*100)/100 + "%", true);
        //                             embed.addField("Player", "[" + username + "](https://osu.ppy.sh/users/" + recentScores[0]["user_id"] + ")");
        //                             embed.addField("Difficulty", Math.round(beatMap["difficultyrating"]*100)/100 + "⭐", true);
        //                             //TODO: generate used mods from id
        //                             let mods = recentScores[0]["enabled_mods"];
        //                             // var mods = osuHelpers.generateModsString(recentScores[0]["enabled_mods"]);
        //                             embed.addField("Mods", mods, true);
        //                             // embed.addField("Mods", recentScores[0]["enabled_mods"], true);
        //                             embed.addField("300s", count300s, true);
        //                             embed.addField("100s", count100s, true);
        //                             embed.addField("50s", count50s, true);
        //                             embed.addField("Misses", countmiss, true);
        //                             let minSincePlay = osuMath.calculateTimeSincePlay(recentScores[0].date);
        //                             let hours = parseInt(minSincePlay/60);
        //                             let minutes = minSincePlay - hours*60;
        //                             let footer = osuHelpers.generateTimeFooter(hours, minutes);
        //                             embed.setFooter(footer);
        //
        //                             //let r1 = await math.decToBinary(mods);
        //                             message.channel.send(embed);
        //
        //                         });
        //
        //                 });
        //
        //         });
        //
        // });

    }
}