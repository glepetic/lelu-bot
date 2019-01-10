const bot = require("../.././bot.js");
const osuApi = bot.osuApi;
const osuMath = require("./math.js");
const osuHelpers = require("./helpers.js");
const helpers = require(".././helpers.js");
const osuDB = require(".././db/osuDB.js");

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

                            let url = "https://osu.ppy.sh/b/" + lastScore["beatmap_id"];

                            bot.request(url, {json: true}, (err, res, body) => {
                                if (err) {
                                    return console.log(err)
                                }
                                ;
                                let linkForImageId = res.toJSON()["request"]["uri"]["href"];
                                let subLink = linkForImageId.substring(31);
                                let splitID = subLink.split("#");

                                let embed = new bot.discord.RichEmbed();
                                embed.setTitle("__**" + beatMap.title + " [" + beatMap.version + "]" + "**__");
                                embed.setURL(url);
                                embed.setThumbnail("https://b.ppy.sh/thumb/" + splitID[0] + "l.jpg");
                                embed.addField("Rank", osuHelpers.determinateRank(lastScore.rank), true);
                                embed.addField("Accuracy", Math.round(osuMath.calculateAccuracy(count50s, count100s, count300s, countmiss) * 100) / 100 + "%", true);
                                let maxCombo = recentScores[0]["maxcombo"];
                                embed.addField("Score", helpers.stringifyNumber(lastScore.score) + " (x" + maxCombo + ")", true);
                                embed.addField("Player", "[" + username + "](https://osu.ppy.sh/users/" + lastScore["user_id"] + ")", true);
                                embed.addField("Difficulty", Math.round(beatMap["difficultyrating"] * 100) / 100 + "★", true);
                                let usedMods = lastScore["enabled_mods"];
                                let modsString = osuHelpers.generateModsString(usedMods);
                                embed.addField("Mods", modsString, true);
                                embed.addField("300s", count300s, true);
                                embed.addField("100s", count100s, true);
                                embed.addField("50s", count50s, true);
                                embed.addField("Misses", countmiss, true);
                                embed.addField("Download", "[Link](https://osu.ppy.sh/d/" + splitID[0] + ")\n");
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

exp.recent = recent;
exp.register = register;
