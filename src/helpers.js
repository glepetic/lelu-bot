const bot = require(".././bot.js");

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

function generateTimeString(timeArray){

    let years = timeArray[0];
    let months = timeArray[1];
    let days = timeArray[2];
    let hours  = timeArray[3];
    let minutes = timeArray[4];
    let seconds = timeArray[5];

    let timeAsString = years + " years, " + months + " months, " + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds";

    if(years == 0){
        timeAsString = timeAsString.replace("0 years, ", "");
    }else if(years == 1){
        timeAsString = timeAsString.replace("years", "year");
    }
    if(months == 0){
        timeAsString = timeAsString.replace("0 months, ", "");
    }else if(months == 1){
        timeAsString = timeAsString.replace("months", "month");
    }
    if(days == 0){
        timeAsString = timeAsString.replace("0 days, ", "");
    }else if(days == 1){
        timeAsString = timeAsString.replace("days", "day");
    }
    if(hours == 0){
        timeAsString = timeAsString.replace("0 hours, ", "");
    }else if(hours == 1){
        timeAsString = timeAsString.replace("hours", "hour");
    }
    if(minutes == 0){
        timeAsString = timeAsString.replace("0 minutes, ", "");
    }else if(minutes == 1){
        timeAsString = timeAsString.replace("minutes", "minute");
    }
    if(seconds == 0){
        timeAsString = timeAsString.replace(", 0 seconds", "");
    }else if(seconds == 1){
        timeAsString = timeAsString.replace("seconds", "second");
    }

    return timeAsString;

}

exports.getUsername = getUsername;
exports.getDMPref = getDMPref;
exports.setDMPref = setDMPref;
exports.checkArguments = checkArguments;
exports.stringifyNumber = stringifyNumber;
exports.verifyAdmin = verifyAdmin;
exports.generateTimeString = generateTimeString;