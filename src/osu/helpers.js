var bot = require("../../bot.js");

module.exports = {
    generateTimeFooter : function(hours, minutes){
        var footer;
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
        var mods = determinateModsUsed(modNumber);
        var modsString = "";
        var i;
        for(i=0; i<mods.length; i++){
            modsString = modsString + mods[i];
            if(i+1 < mods.length){
                modsString = modsString + ",";
                continue;
            }
        }
        return modsString;
    },

    findUser : function(userID){

        bot.mongoClient.connect(function(err){
            console.error(err);
            console.log("Connected succesfully to osu database");

            var osudb = bot.mongoClient.db("osu");
            var osuUserRegister = osudb.collection("user-register");
            // osuUserRegister.insertOne({osu : "xHix", discord: "500036526546223106"},
            //             //     function(err, result){
            //             //         //do something
            //             //     });
            var query = {_id: userID};
            osuUserRegister.find(query).toArray(function(err, result) {
                if(err){
                    console.error(err);
                    return;
                }
                if(result.length == 0){
                    console.log("Empty set");
                    return;
                }
                return result[0]["osu"];
                osudb.close();
            });
            bot.mongoClient.close();


        });

    }

}

function determinateModsUsed(modNumber){
    var modsUsed = new Array();
    console.log(modsUsed.length);
    if(modNumber === 0) {
        console.log(modNumber);
        modsUsed.push("No mods");
        return modsUsed;
    }else if(modNumber % 2 > 0){
        modsUsed.push("No Fail");
    }else if(modNumber >= 536870912){
        modsUsed.push("ScoreV2");
    }
    return modsUsed;
}
