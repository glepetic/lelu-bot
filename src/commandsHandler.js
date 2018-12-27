var bot = require(".././bot.js");
var adminCommands = require("./adminCommands.js");
var regularCommands  = require("./regularCommands.js");
var ownerCommands = require("./ownerCommands.js");

module.exports = {
    executeCommand: function (message, args) {
        var cmd = args[0];
        switch (cmd) {
			case "kill" :
				if(new bot.bigNumbers.Big("500036526546223106").eq(message.author.id)){
					ownerCommands.exit();
				}
				break;
			case "worms":
				regularCommands.worms(message);
				break;
            case "gay" :
                regularCommands.gay(message);
                break;
            case "osu" :
                var osuArgs = args.filter(param => !(param === "osu"));
                regularCommands.osu(message, osuArgs);
				break;

        }
    },
    executeAdminCommand: function (message, args) {
        var cmd = args[0];
        switch (cmd) {
            case "purge":
                var qty = args[1];
                adminCommands.purge(message, qty);
                break;

            default:
                return;
        }
    }
}
