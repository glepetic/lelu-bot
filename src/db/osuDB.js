let bot = require("../.././bot.js");
// let mongoURL = "mongodb+srv://sucre:Lgo**2019!@sb-v30sa.mongodb.net/";

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

module.exports.initDB = init;
module.exports.User = User;