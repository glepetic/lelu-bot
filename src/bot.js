var Discord = require("discord.js");
var osu = require("osu-api");
var request = require("request");
module.exports = {
    osuApi : new osu.Api("3154dc707474e9590e5cd57c6b3de1f6e5e1a0f3", {
    notFoundAsError : true,
    completeScores : true
  }),
  client : new Discord.Client(),
  discord : Discord,
  request : request
}
var bot = require("./bot.js");
// bot.osuApi.setMode(bot.osuApi.Modes.osu);
var config = require(".././settings/config.json");
var commandsHandler = require("./commandsHandler.js");
var nonCommandsHandler = require("./nonCommandsHandler.js");

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

    var memRoles = message.member.roles;

    //104324169 is the id of the admin permissions
    if(memRoles.some(role => role.hasPermission("ADMINISTRATOR"))){
      commandsHandler.executeAdminCommand(message, args);
    }

    }

});


//Login to your bot edit the config file on settings folder
bot.client.login(config.token);