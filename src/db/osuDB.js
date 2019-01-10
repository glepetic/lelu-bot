let bot = require("../.././bot.js");

const exp = module.exports;

let userSchema = new bot.mongoose.Schema({
    _id: bot.mongoose.Schema.Types.Long,
    osu: String
});;
let User = bot.mongoose.model("User", userSchema);

function init() {
    bot.mongoose.connect(bot.mongoURL + "osu", {useNewUrlParser : true});
    let osuDB = bot.mongoose.connection;
    osuDB.on("error", function(err){
        console.error(err);
        process.exit();
    })

}

function connect(){
    bot.mongoose.connect(bot.mongoURL + "osu", {useNewUrlParser : true});
    let osuDB = bot.mongoose.connection;
    osuDB.on("error", console.error.bind(console, 'connection error:'));
    return osuDB;
}


//models
exports.User = User;

//functions

exp.init = init;
exp.connect = connect;