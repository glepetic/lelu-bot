const bot = require("../.././bot.js");
const math = require(".././math.js");
const osuMods = require("./mods.js");

module.exports = {
    generateTimeFooter : function(hours, minutes){
        let footer;
        if(hours === 0 && minutes === 0){
            footer = "Just now";
            return footer;
        }else if(hours === 0){
            footer = minutes + " minute";
            footer = minutes === 1 ? footer : footer + "s";
        }else if(minutes === 0){
            footer = hours + " hour";
            footer = hours === 1 ? footer : footer + "s";
        }else{
            footer = hours + " hour";
            footer = hours === 1 ? footer : footer + "s";
            footer = footer + " and " + minutes + " minute";
            footer = minutes === 1 ? footer : footer + "s";
        }
        footer = footer + " ago";
        return footer;
    },

    determinateRank: function(rank){
        switch(rank){
            case "A" :
                return "<:rankingAsmall:527695142493356052>";
            case "B" :
                return "<:rankingBsmall:527695161149620225>";
            case "C" :
                return "<:rankingCsmall:527695172172251137>";
            case "D" :
                return "<:rankingDsmall:527695181642989599>";
            case "F" :
                return "<:rankingFsmall:527660248127897610>";
            case "S" :
                return "<:rankingSsmall:527695206380994560>";
            case "X" :
                return "<:rankingXsmall:527695239561871370>";
            case "SH" :
                return "<:rankingSHsmall:527695193764265995>";
            case "XH" :
                return "<:rankingXHsmall:527695215964848159>";

        }
    },

    generateModsString: function(modNumber){
        let modsBinary = math.decToBinary(modNumber);
        let len = modsBinary.length;
        let i;
        let modsString = "";
        let noMods = true;

        for(i=0; i<len; i++){

            if(modsBinary[i] == 1){
                modsString = modsString + osuMods[i];
                noMods = false;
                if(i+1 < len) modsString = modsString + ", ";
            }

        }

        if(noMods) modsString = modsString + "None";
        if(modsString.includes("NC")){
            modsString = modsString.replace("DT, ", "");
        }
        if(modsString.includes("PF")){
            modsString = modsString.replace("SD, ", "");
        }

        return modsString;

    },

    registerOnDB : function(message, discordID, username, User){

        let newUser;

        try {

            newUser = new User({
                _id: bot.Long.fromString("" + discordID + "", 10),
                osu: username
            });

        }catch(err){
            console.error(err);
            return;
        }

        newUser.save(function(err, result){
            if(err){
                console.error(err);
                return;
            }
            console.log(result);
            message.channel.send("Done!");
            bot.mongoose.connection.close();
        });

    }

}

