const bot = require("../.././bot.js");
const dbLib = require("./db.js");


let userSchema = new bot.mongoose.Schema({
    _id: bot.mongoose.Schema.Types.Long,
    osu: String
});;
let User = bot.mongoose.model("User", userSchema);


function init(){
    dbLib.init("osu");
}

function connect(){
    return dbLib.connect("osu");
}


function handleRequest(message, request){
    let db = connect();
    db.once("open", async function () {
        let query;
        try {
            query = User.findOne({_id: message.author.id});
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
                request(message, uR.osu);
            } else {
                message.channel.send("You are not registered! Use !osu register for more info.");
            }
        });

    });
}

function registerOnDB(message, discordID, username) {

    let newUser;

    try {

        newUser = new User({
            _id: bot.Long.fromString("" + discordID + "", 10),
            osu: username
        });

    } catch (err) {
        console.error(err);
        return;
    }

    newUser.save(function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result);
        message.channel.send("Done!");
        bot.mongoose.connection.close();
    });

}

//models
exports.User = User;

//functions

exports.init = init;
exports.handleRequest = handleRequest;
exports.registerOnDB = registerOnDB;