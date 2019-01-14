const bot = require("../.././bot.js");
const dbLib = require("./db.js");
const markdown = require(".././discord/markdown.js");

function register(message, preference) {
    let discordID = message.author.id;
    let newUser = new dbLib.User({
        _id: bot.Long.fromString(discordID, 10),
        osu: null,
        league: null,
        dm: preference
    });
    let valueToUpdate = {dm: preference};
    dbLib.register(message, discordID, newUser, valueToUpdate);
}

function sendDM(message, user, content, notification){
    let db = dbLib.connect();
    db.once("open", async function () {
        let query;
        try {
            query = dbLib.User.findOne({_id: user.id});
        } catch (err) {
            console.error(err);
            return;
        }

        query.exec(async function (err, userRet) {
            if (err) {
                console.error(err);
                return;
            }
            let uR = await userRet;

            if(uR == null){
                register(message, true);
                user.send(content);
                if(notification != null) message.channel.send(notification);
            }else{
                if(uR.dm){
                    user.send(content);
                    if(notification != null) message.channel.send(notification);
                }else{
                    message.channel.send(markdown.bold(user.username) + " has direct messages disabled.");
                }
            }

        });

    });
}

exports.registerDMPreference = register;
exports.sendDM = sendDM;