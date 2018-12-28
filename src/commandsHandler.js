var bot = require(".././bot.js");
var adminCommands = require("./adminCommands.js");
var regularCommands  = require("./regularCommands.js");
var helpers = require("./helpers.js");
var ownerCommands = require("./ownerCommands.js");

module.exports = {
    executeCommand: function (message, args) {
        var cmd = args[0];
        switch (cmd) {
            case "requests" :
                if(helpers.checkArguments(message, args)) break;
                regularCommands.requests(message);
                break;
			case "worms" :
                if(helpers.checkArguments(message, args)) break;
				regularCommands.worms(message);
				break;
            case "gay" :
                regularCommands.gay(message);
                break;
            case "osu" :
                var osuArgs = args.filter(param => !(param === "osu"));
                regularCommands.osu(message, osuArgs);
				break;
            case "uptime" :
                break;
            case "age" :
                regularCommands.age(message);
                break;
            case "p" :
                var text = args[1];
                var user = helpers.getUsername(args, 2);
                if(text == null || user == null){
                    message.channel.send("Please follow template: !p <text> <user>");
                    break;
                }
                regularCommands.p(message, text, user);
                break;

        }
    },
    executeAdminCommand: function (message, args) {
        var cmd = args[0];
        switch (cmd) {
            case "purge":
                if(!helpers.verifyAdmin(message.member.roles)) break;
                var qty = args[1];
                adminCommands.purge(message, qty);
                break;

            default:
                return;
        }
    }
}
