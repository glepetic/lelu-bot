const bot = require("../.././bot.js");
const osuApi = bot.osuApi;
const osuMath = require("./math.js");
const osuHelpers = require("./helpers.js");
const helpers = require(".././helpers.js");
const dbLib = require("../amadeus/db.js");
const osuDB = require("../amadeus/osu.js");
const markdown = require("../discord/markdown.js");
const math = require(".././math.js");


function help(message){
    let embed = new bot.discord.RichEmbed();
    embed.setTitle("Amadeus Osu Help");
    embed.setDescription("Here is a list of osu related commands that are available to everyone.");
    embed.setColor(13977185);
    embed.setThumbnail(bot.client.user.displayAvatarURL);
    embed.addField("Key", helpers.getKey());
    embed.addField("Commands", osuHelpers.getCommands());
    embed.setFooter("Created by " + bot.owner.user.tag, bot.owner.user.displayAvatarURL);
    embed.setTimestamp(bot.client.user.createdAt);
    message.author.send(embed);
}

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

                                let secondsSincePlay = math.secondsSinceDate(lastScore.date);
                                let timeSincePlay = math.secondsToTimeArray(secondsSincePlay);
                                let timeSincePlayString = helpers.generateTimeString(timeSincePlay);

                                osuApi.getScores(lastScore["beatmap_id"], user,
                                    function (err, bmpScores) {

                                        let ppGain = null;

                                        let score = bmpScores.filter(scr => scr.date === lastScore.date).shift();
                                        if (score != null) {
                                            ppGain = " +" + Math.round(score.pp) + "pp";
                                        }

                                        let embed = osuHelpers.generatePlayEmbed(
                                            "[" + username + "](https://osu.ppy.sh/users/" + lastScore["user_id"] + ")", url,
                                            beatMap.title, beatMap.version, splitID[0], osuHelpers.determinateRank(lastScore.rank), ppGain,
                                            Math.round(osuMath.calculateAccuracy(count50s, count100s, count300s, countmiss) * 100) / 100 + "%",
                                            helpers.stringifyNumber(lastScore.score) + " (x" + maxCombo + ")",
                                            lastScore.date, Math.round(beatMap["difficultyrating"] * 100) / 100 + "★",
                                            osuHelpers.generateModsString(usedMods), count300s, count100s, count50s, countmiss, countGeki, countKatu,
                                            timeSincePlayString + " ago");

                                        message.channel.send(embed);

                                    });

                            });

                        });

                });

        });

}

function register(message, user) {
    if (user == null) {
        message.channel.send("Please indicate the username to register.");
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
        }else{
            osuDB.registerOsuUser(message, user);
        }
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

                                let secondsSincePlay = math.secondsSinceDate(bestScore.date);
                                let timeSincePlay = math.secondsToTimeArray(secondsSincePlay);
                                let timeSincePlayString = helpers.generateTimeString(timeSincePlay);

                                let embed = osuHelpers.generatePlayEmbed(
                                    "[" + username + "](https://osu.ppy.sh/users/" + bestScore["user_id"] + ")", url,
                                    beatMap.title, beatMap.version, splitID[0],
                                    osuHelpers.determinateRank(bestScore.rank), " +" + Math.round(bestScore.pp) + "pp",
                                    Math.round(osuMath.calculateAccuracy(count50s, count100s, count300s, countmiss) * 100) / 100 + "%",
                                    helpers.stringifyNumber(bestScore.score) + " (x" + maxCombo + ")",
                                    bestScore.date, Math.round(beatMap["difficultyrating"] * 100) / 100 + "★",
                                    osuHelpers.generateModsString(usedMods),
                                    count300s, count100s, count50s, countmiss, countGeki, countKatu,
                                    timeSincePlayString + " ago");

                                message.channel.send(embed);

                            });

                        });

                });

        });

}

function wasted(message, user) {
    osuApi.getUser(user,
        async function (err, userJSON) {
            if (userJSON == null) {
                message.channel.send("The player " + user + " does not exist.");
                return;
            }
            let username = userJSON["username"];
            let secondsPlayed = userJSON["total_seconds_played"];

            let timeWasted = math.secondsToTimeArray(secondsPlayed);
            let timeWastedString = helpers.generateTimeString(timeWasted);

            message.channel.send(markdown.bold(username) + " has wasted " + timeWastedString + " playing osu!");

        });
}

exports.recent = recent;
exports.register = register;
exports.best = best;
exports.wasted = wasted;
exports.help = help;
