const bot = require("../.././bot.js");

function init(db) {
    bot.mongoose.connect(bot.mongoURL + db, {useNewUrlParser : true});
    let osuDB = bot.mongoose.connection;
    osuDB.on("error", function(err){
        console.error(err);
        process.exit();
    })

}

function connect(db){
    bot.mongoose.connect(bot.mongoURL + db, {useNewUrlParser : true});
    let dbInstance = bot.mongoose.connection;
    dbInstance.on("error", console.error.bind(console, 'connection error:'));
    return dbInstance;
}

exports.init = init;
exports.connect = connect;