const bot = require("../.././bot.js");
const osuApi = bot.osuApi;
const osuMath = require("./math.js");
const osuHelpers = require("./helpers.js");
const helpers = require(".././helpers.js");
const osuDB = require(".././db/osuDB.js");
const textFormat = require(".././discord/textFormat.js");

const exp = module.exports;


function recent(message, user) {

    osuApi.getUser(user,
        async function (err, userJSON) {
            if (userJSON == null) {
                message.channel.send("The player " + user + " does not exist.");
                return;
            }
            let username = userJSON["username"];

            let lastScore;

            await osuApi.getUserRecent(user,
                function (err, recentScores) {
                    if (recentScores[0] == null) {
                        message.channel.send("This player has not played in the last 24 hours.");
                        return;
                    }

                    lastScore = recentScores[0];

                    osuApi.getBeatmap(lastScore["beatmap_id"],
                        function (err, beatMap) {

                            let count50s = lastScore["count50"];
                            let count100s = lastScore["count100"];
                            let count300s = lastScore["count300"];
                            let countmiss = lastScore["countmiss"];
                            let countGeki = lastScore["countgeki"];
                            let countKatu = lastScore["countkatu"];

                            let url = "https://osu.ppy.sh/b/" + lastScore["beatmap_id"];

                            bot.request(url, {json: true}, (err, res, body) => {
                                if (err) {
                                    return console.log(err)
                                }

                                let linkForImageId = res.toJSON()["request"]["uri"]["href"];
                                let subLink = linkForImageId.substring(31);
                                let splitID = subLink.split("#");

                                let maxCombo = lastScore["maxcombo"];
                                let usedMods = lastScore["enabled_mods"];

                                osuApi.getScores(lastScore["beatmap_id"], user,
                                    function (err, bmpScores) {

                                        let ppGain = "";

                                        let score = bmpScores.filter(scr => scr.date === lastScore.date).shift();
                                        if (score != null) {
                                            ppGain = textFormat.boldString(" +" + Math.round(score.pp) + "pp");
                                        }

                                        let embed = new bot.discord.RichEmbed();
                                        embed.setTitle("__**" + beatMap.title + " [" + beatMap.version + "]" + "**__");
                                        embed.setURL(url);
                                        embed.setThumbnail("https://b.ppy.sh/thumb/" + splitID[0] + "l.jpg");
                                        embed.addField("Rank & PP", osuHelpers.determinateRank(lastScore.rank) + ppGain, true);
                                        embed.addField("Accuracy", textFormat.boldString(Math.round(osuMath.calculateAccuracy(count50s, count100s, count300s, countmiss) * 100) / 100 + "%"), true);
                                        embed.addField("Score", textFormat.boldString(helpers.stringifyNumber(lastScore.score) + " (x" + maxCombo + ")"), true);
                                        embed.addField("Player", "[" + username + "](https://osu.ppy.sh/users/" + lastScore["user_id"] + ")", true);
                                        embed.addField("Difficulty", textFormat.boldString(Math.round(beatMap["difficultyrating"] * 100) / 100 + "★"), true);
                                        let modsString = osuHelpers.generateModsString(usedMods);
                                        let boldMods = textFormat.boldString(modsString);
                                        embed.addField("Mods", boldMods, true);
                                        embed.addField("Hits",
                                            "<:hit300sb:532754291199442964> " + count300s + " "
                                            + "<:hitgekisb:532764843648876554>" + countGeki + "\n"
                                            + "<:hit100sb:532754307897098240> " + count100s + " "
                                            + "<:hitkatusb:532764853270741002>" + countKatu + "\n"
                                            + "<:hit50sb:532754317808238615> " + count50s + " "
                                            + "<:hit0sb:532754325467037696> " + countmiss
                                            , true);
                                        embed.addField("Download", "[Link](https://osu.ppy.sh/d/" + splitID[0] + ")", true);
                                        let minSincePlay = osuMath.calculateTimeSincePlay(lastScore.date);
                                        let hours = parseInt(minSincePlay / 60);
                                        let minutes = minSincePlay - hours * 60;
                                        let footer = osuHelpers.generateTimeFooter(hours, minutes);
                                        embed.setFooter(footer);

                                        message.channel.send(embed);

                                    });

                            });

                        });

                });

        });

}

function register(message, user, force) {
    let discordUserId = message.author.id;

    bot.mongoose.connect(bot.mongoURL + "osu", {useNewUrlParser: true});
    let db = bot.mongoose.connection;

    db.on("error", console.error.bind(console, 'connection error:'));
    db.once("open", async function () {
        //we are connected
        console.log("Connected succesfully to osu database");

        let User = osuDB.User;

        let query;

        try {
            query = User.findOne({_id: discordUserId});
        } catch (err) {
            console.error(err);
        }

        query.exec(function (err, userRet) {
            if (err) {
                console.error(err);
                return;
            }

            if (userRet == null || force) {

                if (user == null) {
                    message.channel.send("Please indicate the username to register");
                    return;
                }

                osuApi.getUser(user, async function (err, osuUser) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (await osuUser == null) {
                        message.channel.send("Only valid osu usernames are allowed!");
                        return;
                    }

                    if (userRet != null) {
                        User.updateOne({_id: discordUserId},
                            {$set: {osu: user}},
                            function (err, result) {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                message.channel.send("Done!");
                                db.close();
                            });
                        return;
                    }

                    osuHelpers.registerOnDB(message, discordUserId, user, User);

                });

                return;
            }

            message.channel.send("You are already registered as **" + userRet.osu + "**. Use '!osu register -f <user>' to change your user associated.");


        });

    });

}

function best(message, user) {

    osuApi.getUser(user,
        async function (err, userJSON) {
            if (userJSON == null) {
                message.channel.send("The player " + user + " does not exist.");
                return;
            }
            let username = userJSON["username"];

            let bestScore;

            await osuApi.getUserBest(user,
                function (err, bestScores) {

                    bestScore = bestScores[0];

                    osuApi.getBeatmap(bestScore["beatmap_id"],
                        function (err, beatMap) {

                            let count50s = bestScore["count50"];
                            let count100s = bestScore["count100"];
                            let count300s = bestScore["count300"];
                            let countmiss = bestScore["countmiss"];
                            let countGeki = bestScore["countgeki"];
                            let countKatu = bestScore["countkatu"];

                            let url = "https://osu.ppy.sh/b/" + bestScore["beatmap_id"];

                            bot.request(url, {json: true}, (err, res, body) => {
                                if (err) {
                                    return console.log(err)
                                }

                                let linkForImageId = res.toJSON()["request"]["uri"]["href"];
                                let subLink = linkForImageId.substring(31);
                                let splitID = subLink.split("#");

                                let maxCombo = bestScore["maxcombo"];
                                let usedMods = bestScore["enabled_mods"];

                                let ppGain = textFormat.boldString(" +" + Math.round(bestScore.pp) + "pp");

                                let embed = new bot.discord.RichEmbed();
                                embed.setTitle("__**" + beatMap.title + " [" + beatMap.version + "]" + "**__");
                                embed.setURL(url);
                                embed.setThumbnail("https://b.ppy.sh/thumb/" + splitID[0] + "l.jpg");
                                embed.addField("Rank & PP", osuHelpers.determinateRank(bestScore.rank) + ppGain, true);
                                embed.addField("Accuracy", textFormat.boldString(Math.round(osuMath.calculateAccuracy(count50s, count100s, count300s, countmiss) * 100) / 100 + "%"), true);
                                embed.addField("Score", textFormat.boldString(helpers.stringifyNumber(bestScore.score) + " (x" + maxCombo + ")"), true);
                                embed.addField("Player", "[" + username + "](https://osu.ppy.sh/users/" + bestScore["user_id"] + ")", true);
                                embed.addField("Difficulty", textFormat.boldString(Math.round(beatMap["difficultyrating"] * 100) / 100 + "★"), true);
                                let modsString = osuHelpers.generateModsString(usedMods);
                                let boldMods = textFormat.boldString(modsString);
                                embed.addField("Mods", boldMods, true);
                                embed.addField("Hits",
                                    "<:hit300sb:532754291199442964> " + count300s + " "
                                    + "<:hitgekisb:532764843648876554>" + countGeki + "\n"
                                    + "<:hit100sb:532754307897098240> " + count100s + " "
                                    + "<:hitkatusb:532764853270741002>" + countKatu + "\n"
                                    + "<:hit50sb:532754317808238615> " + count50s + " "
                                    + "<:hit0sb:532754325467037696> " + countmiss
                                    , true);
                                embed.addField("Download", "[Link](https://osu.ppy.sh/d/" + splitID[0] + ")", true);
                                let minSincePlay = osuMath.calculateTimeSincePlay(bestScore.date);
                                let hours = parseInt(minSincePlay / 60);
                                let minutes = minSincePlay - hours * 60;
                                let footer = osuHelpers.generateTimeFooter(hours, minutes);
                                embed.setFooter(footer);

                                message.channel.send(embed);

                            });

                        });

                });

        });

}

exp.recent = recent;
exp.register = register;
exp.best = best;
