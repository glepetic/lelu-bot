const bot = require("../.././bot.js");
const osuApi = bot.osuApi;
const osuMath = require("./math.js");
const osuHelpers = require("./helpers.js");
const helpers = require(".././helpers.js");
const osuDB = require(".././db/osuDB.js");
const textFormat = require(".././discord/textFormat.js");
const math = require(".././math.js");

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

                                let secondsSincePlay = math.secondsSinceDate(lastScore.date);
                                let timeSincePlay = math.secondsToTimeArray(secondsSincePlay);
                                let timeSincePlayString = helpers.generateTimeString(timeSincePlay);

                                osuApi.getScores(lastScore["beatmap_id"], user,
                                    function (err, bmpScores) {

                                        let ppGain = "";

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

function register(message, user, force) {
    let discordUserId = message.author.id;

    bot.mongoose.connect(bot.mongoURL + "osu", {useNewUrlParser: true});
    let db = bot.mongoose.connection;

    db.on("error", console.error.bind(console, 'connection error:'));
    db.once("open", async function () {

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

                    osuDB.registerOnDB(message, discordUserId, user);

                });

                return;
            }

            message.channel.send("You are already registered as " + textFormat.boldString(userRet.osu) + ". Use '!osu register -f <user>' to change your user associated.");


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

function wasted(message, user){
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

            message.channel.send(textFormat.boldString(username) + " has wasted " + timeWastedString + " playing osu!");

        });
}

exp.recent = recent;
exp.register = register;
exp.best = best;
exp.wasted = wasted;
