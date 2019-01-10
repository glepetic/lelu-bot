const bot = require(".././bot.js");

const exp = module.exports;

function checkArguments(message, args) {
    if (args[1] != null) {
        message.channel.send("This command doesn't take any arguments!");
        return 1;
    }
    return 0;
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
    if (message.member.roles.some(role => role.hasPermission("ADMINISTRATOR"))) {
        return true;
    }
    message.channel.send("You are not an admin!");
    return false;
}


function getDMPref(userId) {

    let path = bot.appRoot + "/public/userPreferences/dm/" + userId + ".json";
    let rawdata;
    let value;
    try {
        rawdata = bot.fs.readFileSync(path);
        let jsonFile = JSON.parse(rawdata);
        value = jsonFile.enabled;
    } catch (err) {
        let newJson = {
            enabled: true
        };

        let data = JSON.stringify(newJson);
        bot.fs.writeFileSync(path, data, {flag: 'w'});
        value = newJson.enabled;
    }

    return value;

}


function setDMPref(userId, pref) {

    let path = bot.appRoot + "/public/userPreferences/dm/" + userId + ".json";
    let rawdata = bot.fs.readFileSync(path);
    let jsonFile = JSON.parse(rawdata);
    jsonFile.enabled = pref;
    let changedData = JSON.stringify(jsonFile);
    bot.fs.writeFileSync(path, changedData);

}


function stringifyNumber(number)
{

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

exp.getUsername = getUsername;
exp.getDMPref = getDMPref;
exp.setDMPref = setDMPref;
exp.checkArguments = checkArguments;
exp.stringifyNumber = stringifyNumber;
exp.verifyAdmin = verifyAdmin;