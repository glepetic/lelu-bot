var adminCommands = require("./adminCommands.js");
var regularCommands  = require("./regularCommands.js");

module.exports = {
    executeCommand: function (message, args) {
        var cmd = args[0];
        switch (cmd) {
            case "gay" :
                regularCommands.gay(message);
                break;
            case "recent" :
                var user = args[1];
                if(user == null) break;
                var i;
                user = user + " ";
                for(i=2; i<args.length; i++){
                    user = user + args[i] + " ";
                }
                regularCommands.recent(message, user);
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
