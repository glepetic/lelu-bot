const bot = require(".././bot.js");
const adminCommands = require("./adminCommands.js");
const regularCommands  = require("./regularCommands.js");
const helpers = require("./helpers.js");
const ownerCommands = require("./ownerCommands.js");

module.exports = {
    executeCommand: function (message, args) {
        let cmd = args[0];
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
                let osuArgs = args.filter(param => !(param === "osu"));
                regularCommands.osu(message, osuArgs);
				break;
            case "uptime" :
                break;
            case "age" :
                regularCommands.age(message);
                break;
            case "p" :
                let text = args[1];
                let user = helpers.getUsername(args, 2);
                if(text == null || user == null){
                    message.channel.send("Please follow template: !p <text> <user>");
                    break;
                }
                regularCommands.p(message, text, user);
                break;

        }
    },
    executeAdminCommand: function (message, args) {
        let cmd = args[0];
        switch (cmd) {
            case "purge":
                if(!helpers.verifyAdmin(message.member.roles)) break;
                let qty = args[1];
                adminCommands.purge(message, qty);
                break;

            default:
                return;
        }
    }
}
