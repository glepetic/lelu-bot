var Discord = require("discord.js");
var osu = require("osu-api");
var request = require("request");
var big = require("big.js");
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
module.exports = {
    osuApi : new osu.Api("3154dc707474e9590e5cd57c6b3de1f6e5e1a0f3", {
    notFoundAsError : true,
    completeScores : true
  }),
  mongoClient : new MongoClient("mongodb+srv://sucre:Lgo**2019!@sb-v30sa.mongodb.net/", { useNewUrlParser: true }),
  client : new Discord.Client(),
  discord : Discord,
  request : request,
  bigNumbers : big,
  appRoot : __dirname
}

var bot = require("./bot.js");
var config = require("./settings/config.json");
var commandsHandler = require("./src/commandsHandler.js");
var nonCommandsHandler = require("./src/nonCommandsHandler.js");

bot.mongoClient.connect(function(err){
	console.error(err);
	console.log("Connected succesfully to server");
	
	var osudb = bot.mongoClient.db("osu");
	var osuUserRegister = osudb.collection("user-register");
	osuUserRegister.insertOne({osu : "xHix", discord: "500036526546223106"},
		function(err, result){
			//do something
		});
	bot.mongoClient.close();
	
	
});

// Set the prefix
var prefix = config.prefix;

bot.client.on('ready', () => {

    // set status
  bot.client.user.setStatus("online", config.game); // Change from settings/config.json
  console.log('Your Bot is Online')
});
  
bot.client.on("message", (message) => {
  // Exit and stop if the prefix is not there or if user is a bot
  if (message.author.bot) return;

  if(!message.content.startsWith(prefix)){
    nonCommandsHandler.replyToMessage(message);
  }else{

    var msgLength = message.content.length;
    var parameters = message.content.substring(1, msgLength);
    var args = parameters.split(' ');

    commandsHandler.executeCommand(message, args);

    if(message.member == null) return;

    var memRoles = message.member.roles;

    if(memRoles.some(role => role.hasPermission("ADMINISTRATOR"))){
      commandsHandler.executeAdminCommand(message, args);
	  return;
    }
	
	message.channel.send("You are not an admin");

    }

});


//Login to your bot edit the config file on settings folder
bot.client.login(config.token);