const bot = require("../.././bot.js");
const dbLib = require("./db.js");


function handleRequest(message, request) {
    let db = dbLib.connect();
    db.once("open", async function () {
        let query;
        try {
            query = dbLib.User.findOne({_id: message.author.id});
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
            if (uR != null) {
                if(uR.osu != null){
                    request(message, uR.osu);
                    return;
                }else{
                    message.channel.send("You are not registered! Use !osu register for more info.");
                }
            } else {
                message.channel.send("You are not registered! Use !osu register for more info.");
            }
        });

    });
}

function registerOsuUser(message, username) {
    let discordID = message.author.id;
    let newUser = new dbLib.User({
        _id: bot.Long.fromString(discordID, 10),
        osu: username,
        league: null,
        dm: true
    });
    let valueToUpdate = {osu: username};
    dbLib.register(message, discordID, newUser, valueToUpdate);
}

exports.handleRequest = handleRequest;
exports.registerOsuUser = registerOsuUser;