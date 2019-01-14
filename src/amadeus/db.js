const bot = require("../.././bot.js");
const mongoURL = "mongodb+srv://sucre:Lgo**2019!@sb-v30sa.mongodb.net/Amadeus";

let userSchema = new bot.mongoose.Schema({
    _id: bot.mongoose.Schema.Types.Long,
    osu: String,
    league: String,
    dm: Boolean
});

let User = bot.mongoose.model("User", userSchema);

function init() {
    bot.mongoose.connect(mongoURL, {useNewUrlParser: true});
    let osuDB = bot.mongoose.connection;
    osuDB.on("error", function (err) {
        console.error(err);
        process.exit();
    })

}

function connect() {
    bot.mongoose.connect(mongoURL, {useNewUrlParser: true});
    let dbInstance = bot.mongoose.connection;
    dbInstance.on("error", console.error.bind(console, 'connection error:'));
    return dbInstance;
}


function register(message, discordID, newUser, valueToUpdate) {
    let dbInstance = connect();
    dbInstance.once("open", async function () {

        let query;

        try {
            query = User.findOne({_id: discordID});
        } catch (err) {
            console.error(err);
        }

        query.exec(function (err, userRet) {
            if (err) {
                console.error(err);
                return;
            }

            if (userRet == null) {

                newUser.save(function (err, result) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(result);
                    message.channel.send("Done!");
                });
            } else {

                User.updateOne({_id: discordID}, {$set: valueToUpdate}, function (err, result) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(result);
                    message.channel.send("Done!");
                });

            }

        });

    });

}


//models
exports.User = User;

//functions
exports.init = init;
exports.connect = connect;
exports.register = register;