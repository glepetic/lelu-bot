const bot = require(".././bot.js");
const adminCommands = require("./adminCommands.js");
const regularCommands = require("./regularCommands.js");
const helpers = require("./helpers.js");
const localGif = require("./gifs/local.js");
const math = require("./math.js");


function executeCommand(message, args) {
    let text;
    let cmd = args[0];
    switch (cmd) {
        case "requests" :
            if (!helpers.checkNull(message, args[1])) break;
            regularCommands.requests(message);
            break;
        case "worms" :
            if (!helpers.checkNull(message, args[1])) break;
            regularCommands.worms(message);
            break;
        case "gay" :
            if (message.mentions.users.first() == null && args[1] != null) {
                message.channel.send("This command only takes mentions.");
                break;
            }
            regularCommands.gay(message);
            break;
        case "dm" :
            let flag = args[1];
            if (flag == null) {
                message.channel.send("Please follow template: !dm [enable|disable]");
                break;
            }
            regularCommands.dm(message, flag);
        case "osu" :
            args.shift();
            regularCommands.osu(message, args);
            args.unshift("osu");
            break;
        case "uptime" :
            if (!helpers.checkNull(message, args[1])) break;
            regularCommands.uptime(message);
            break;
        case "age" :
            if (!helpers.checkNonMentions(message, args, 1)) break;
            regularCommands.age(message);
            break;
        case "p" :
            text = args[1];
            let user = helpers.getUsername(args, 2);
            if (text == null || user == null) {
                message.channel.send("Please follow template: !p <text> <user>");
                break;
            }
            regularCommands.p(message, text, user);
            break;
        case  "say" :
            if (args[1] == null) {
                helpers.deleteMsg(message);
                message.channel.send("ʎɐs¡");
                break;
            }
            args.shift();
            text = args.join(' ');
            regularCommands.say(message, text);
            break;
        case "help" :
            if (!helpers.checkNull(message, args[1])) break;
            regularCommands.help(message);
            break;
        case "gnome" :
            message.channel.send("https://www.youtube.com/watch?v=6n3pFFPSlW4");
            break;
        case "roll" :
            let limit = args[1];
            if (!helpers.checkNull(message, args[2])) break;
            regularCommands.roll(message, limit);
            break;
        case "kiss" :
            helpers.reactWithGif(args, message, "Looks like you have no one to kiss, heh, sad life.", localGif.kiss)
            break;
        case "hug" :
            helpers.reactWithGif(args, message, "Looks like you have no one to hug, heh, sad life.", localGif.hug)
            break;
        case "lick" :
            helpers.reactWithGif(args, message, "Lick this.", localGif.lick)
            break;
        case "slap" :
            helpers.reactWithGif(args, message, "I'LL SLAP YOU", localGif.slap)
            break;
    }
}

function executeAdminCommand(message, args) {
    let cmd = args[0];
    switch (cmd) {
        case "purge":
            if (!helpers.verifyAdmin(message)) break;
            let qty = args[1];
            adminCommands.purge(message, qty);
            break;
        case "help":
            if (!helpers.verifyAdmin(message) || args[1] != null) {
                break;
            }
            adminCommands.help(message);
        default:
            break;
    }
}


exports.executeCommand = executeCommand;
exports.executeAdminCommand = executeAdminCommand;
