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
