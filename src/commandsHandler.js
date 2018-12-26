var adminCommands = require("./adminCommands.js");
var regularCommands  = require("./regularCommands.js");

module.exports = {
    executeCommand: function (message, args) {
        var cmd = args[0];
        switch (cmd) {
            case "gay" :
                regularCommands.gay(message);
                break;
            case "osu" :
                var osuArgs = args.filter(param => !(param === "osu"));
                regularCommands.osu(message, osuArgs);

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
