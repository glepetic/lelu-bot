const bot = require(".././bot.js");
const markdown = require("./discord/markdown.js");

function checkNull(message, element) {
    if(element == null) return true;
    message.channel.send("This command has invalid arguments. Please use !help for more information.");
    return false;
}

function checkNonMentions(message, args, start) {
    let i;
    for (i = start; i < args.length; i++) {
        if (!(args[i].toString().includes("<@"))) {
            message.channel.send("This command has invalid arguments. Please use !help for more information.");
            return false;
        }
    }
    return true;
}

function getUsername(args, start) {
    let user = args[start];
    if (user == null) return;
    let i;
    if (args[start + 1] != null) user = user + " ";
    for (i = start + 1; i < args.length; i++) {
        user = user + args[i];
        if (i + 1 < args.length) {
            user = user + " ";
        }
    }
    return user;
}


function verifyAdmin(message) {
    if (message.member.roles.some(role => role.hasPermission("ADMINISTRATOR"))) return true;
    return false;
}


function stringifyNumber(number) {

    let i;
    let count = 0;
    let inverseNumberString = "";

    for (i = number.length - 1; i >= 0; i--) {

        if (count == 3) {
            inverseNumberString = inverseNumberString + "," + number.charAt(i);
            count = 1;
            continue;
        }

        inverseNumberString = inverseNumberString + number.charAt(i);
        count++;

    }

    let inverseNumberArray = inverseNumberString.split("");
    let numberArray = inverseNumberArray.reverse();

    return numberArray.join("");

}

function generateTimeString(timeArray) {

    let years = timeArray[0];
    let months = timeArray[1];
    let days = timeArray[2];
    let hours = timeArray[3];
    let minutes = timeArray[4];
    let seconds = timeArray[5];

    let timeAsString = years + " years, " + months + " months, " + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds";

    if (years == 0) {
        timeAsString = timeAsString.replace("0 years, ", "");
    } else if (years == 1) {
        timeAsString = timeAsString.replace("years", "year");
    }
    if (months == 0) {
        timeAsString = timeAsString.replace("0 months, ", "");
    } else if (months == 1) {
        timeAsString = timeAsString.replace("months", "month");
    }
    if (days == 0) {
        timeAsString = timeAsString.replace("0 days, ", "");
    } else if (days == 1) {
        timeAsString = timeAsString.replace("days", "day");
    }
    if (hours == 0) {
        timeAsString = timeAsString.replace("0 hours, ", "");
    } else if (hours == 1) {
        timeAsString = timeAsString.replace("hours", "hour");
    }
    if (minutes == 0) {
        timeAsString = timeAsString.replace("0 minutes, ", "");
    } else if (minutes == 1) {
        timeAsString = timeAsString.replace("minutes", "minute");
    }
    if (seconds == 0) {
        timeAsString = timeAsString.replace(", 0 seconds", "");
    } else if (seconds == 1) {
        timeAsString = timeAsString.replace("seconds", "second");
    }

    return timeAsString;

}

function getCommands() {

    let requests = markdown.bold("requests:") + "\n!requests\n" + "Links a document to request additions to the bot.\n\n";
    let dm = markdown.bold("dm:") + "\n!dm [enable | disable]\n" + "Enables or disables the bot's ability to send you direct messages.\n\n";
    let osu = markdown.bold("osu:") + "\n!osu [command]\n" + "Obtains information from the osu api. Use !osu help for more information.\n\n";
    let age = markdown.bold("age:") + "\n!age <mentions>\n" + "Shows how long since the creation of the discord account of mentions. If no mentions, defaults to the server where the message was sent.\n\n";
    let uptime = markdown.bold("uptime:") + "\n!uptime\n" + "Displays how long the bot has been online for.\n\n";
    let roll = markdown.bold("roll:") + "\n!roll <limit>\n" + "Rolls a number between 0 and limit. Limit must be a number. If no limit, defaults to 100.\n\n";
    let gay = markdown.bold("gay:") + "\n!gay <mentions>\n" + "DMs the mentions, maximum mentions is 5. If no mentions, random user is selected.\n\n";
    let p = markdown.bold("p:") + "\n!p [thing1] [thing2]\n" + "Generates a random % between 0 and 100 'p' and replies 'thing2 is p% thing1'\n\n";
    let kiss = markdown.bold("kiss:") + "\n!kiss [mention]\n" + "Sends a GIF of a kiss to the person mentioned.\n\n";
    let hug = markdown.bold("hug:") + "\n!hug [mention]\n" + "Sends a GIF of a hug to the person mentioned.\n\n";
    return requests + dm + osu + age + uptime + roll + p + gay + kiss + hug;
}

function getAdminCommands(){

    let purge = markdown.bold("purge:") + "\n!purge [x]\n" + "Deletes x amount of messages from the channel where the command was sent.\n\n";
    return purge;

}

function getKey(){
    let or = "| : or\n";
    let optional = "<> : optional\n";
    let mandatory = "[] : mandatory\n";
    return or + optional + mandatory;
}

exports.getUsername = getUsername;
exports.checkNull = checkNull;
exports.checkNonMentions = checkNonMentions;
exports.stringifyNumber = stringifyNumber;
exports.verifyAdmin = verifyAdmin;
exports.generateTimeString = generateTimeString;
exports.getCommands = getCommands;
exports.getAdminCommands = getAdminCommands;
exports.getKey = getKey;