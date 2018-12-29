const bot = require(".././bot.js");

module.exports = {
    checkArguments : function(message, args){
        if(args[1] != null){
            message.channel.send("This command doesn't take any arguments!");
            return 1;
        }
        return 0;
    },
    getUsername : function(args, start){
        let user = args[start];
        if(user == null) return;
        let i;
        if(args[start + 1] != null) user = user + " ";
        for(i=start + 1; i<args.length; i++){
            user = user + args[i];
            if(i+1 < args.length){
                user = user + " ";
            }
        }
        return user;
    },

    verifyAdmin : function(message){
        if(message.member.roles.some(role => role.hasPermission("ADMINISTRATOR"))){
            return true;
        }
        message.channel.send("You are not an admin");
        return false;
    },

    getDMPref : function(userId){

        let path = "./" + bot.appRoot + "/public/userPreferences/dm/" + userId + ".json";
        let rawdata = bot.fs.readFileSync(path);
        let value;
        if(rawdata == null){
            let newJson = {
                enabled : true
            };

            let data = JSON.stringify(newJson);
            bot.fs.writeFileSync(path, data);
            value = newJson.enabled;

        }else{
            let jsonFile = JSON.parse(rawdata);
            value = jsonFile.enabled;
        }

        return value;

    },

    setDMPref(userId, pref){

        let path = "./" + bot.appRoot + "/public/userPreferences/dm/" + userId + ".json";
        let rawdata = bot.fs.readFileSync(path);
        let jsonFile = JSON.parse(rawdata);
        jsonFile.enabled = pref;
        let changedData = JSON.stringify(jsonFile);
        bot.fs.writeFileSync(path, changedData);

    }

}