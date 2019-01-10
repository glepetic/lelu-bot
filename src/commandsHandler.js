const bot = require(".././bot.js");
const adminCommands = require("./adminCommands.js");
const regularCommands = require("./regularCommands.js");
const helpers = require("./helpers.js");
const ownerCommands = require("./ownerCommands.js");

const exp = module.exports;


function executeCommand(message, args) {
    let cmd = args[0];
    switch (cmd) {
        case "requests" :
            if (helpers.checkArguments(message, args)) break;
            regularCommands.requests(message);
            break;
        case "worms" :
            if (helpers.checkArguments(message, args)) break;
            regularCommands.worms(message);
            break;
        case "gay" :
            if (message.mentions.users.first() == null && args[1] != null) {
                message.channel.send("This command only takes mentions");
                break;
            }
            regularCommands.gay(message);
            break;
        case "dm" :
            let flag = args[1];
            if (flag == null) {
                message.channel.send("Please follow template: !dm <enable|disable>");
                break;
            }
            message.channel.send("WIP");
        // regularCommands.dm(message, args[1]);
        case "osu" :
            args.shift();
            regularCommands.osu(message, args);
            break;
        case "uptime" :
            //TODO
            break;
        case "age" :
            regularCommands.age(message);
            break;
        case "p" :
            let text = args[1];
            let user = helpers.getUsername(args, 2);
            if (text == null || user == null) {
                message.channel.send("Please follow template: !p <text> <user>");
                break;
            }
            regularCommands.p(message, text, user);
            break;
        case "help" :
            regularCommands.help(message);
            break;
        case "gnome" :
            message.channel.send("https://www.youtube.com/watch?v=6n3pFFPSlW4");
            break;

    }
}

function executeAdminCommand(message, args) {
    let cmd = args[0];
    switch (cmd) {
        case "purge":
            if (!helpers.verifyAdmin(message)) return;
            let qty = args[1];
            adminCommands.purge(message, qty);
            break;

        default:
            return;
    }
}

exp.executeCommand = executeCommand;
exp.executeAdminCommand = executeAdminCommand;
