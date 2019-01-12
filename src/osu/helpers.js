const bot = require("../.././bot.js");
const math = require(".././math.js");
const osuMods = require("./mods.js");
const textFormat = require("../discord/textFormat.js");

const exp = module.exports;

function generateTimeFooter(hours, minutes) {
    let footer;
    if (hours === 0 && minutes === 0) {
        footer = "Just now";
        return footer;
    } else if (hours === 0) {
        footer = minutes + " minute";
        footer = minutes === 1 ? footer : footer + "s";
    } else if (minutes === 0) {
        footer = hours + " hour";
        footer = hours === 1 ? footer : footer + "s";
    } else {
        footer = hours + " hour";
        footer = hours === 1 ? footer : footer + "s";
        footer = footer + " and " + minutes + " minute";
        footer = minutes === 1 ? footer : footer + "s";
    }
    footer = footer + " ago";
    return footer;
}

function determinateRank(rank) {
    switch (rank) {
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
}

function generateModsString(modNumber) {
    let modsBinary = math.decToBinary(modNumber);
    let len = modsBinary.length;
    let i;
    let modsString = "";
    let noMods = true;

    for (i = 0; i < len; i++) {

        if (modsBinary[i] == 1) {
            modsString = modsString + osuMods.names[i];
            noMods = false;
            if (i + 1 < len) modsString = modsString + ", ";
        }

    }

    if (noMods) modsString = modsString + "None";
    if (modsString.includes("NC")) {
        modsString = modsString.replace("DT, ", "");
    }
    if (modsString.includes("PF")) {
        modsString = modsString.replace("SD, ", "");
    }
    if (modsString.includes("NF")) {
        modsString = modsString.replace("EZ, ", "");
        modsString = modsString.replace(", EZ", "");
    }

    return modsString;

}

function generatePlayEmbed(userProfile, url, bmpTitle, bmpVersion, bmpHDID, playRank, ppGain, playAccuracy, playScore, playDate, playDifficulty, playMods, count300s, count100s, count50s, countmiss, countGeki, countKatu, footer){

    let embed = new bot.discord.RichEmbed();
    embed.setTitle("__**" + bmpTitle + " [" + bmpVersion + "]" + "**__");
    embed.setURL(url);
    embed.setThumbnail("https://b.ppy.sh/thumb/" + bmpHDID + "l.jpg");
    embed.addField("Rank & PP", playRank + textFormat.boldString(ppGain), true);
    embed.addField("Accuracy", textFormat.boldString(playAccuracy), true);
    embed.addField("Score", textFormat.boldString(playScore), true);
    embed.addField("Player", userProfile, true);
    embed.addField("Difficulty", textFormat.boldString(playDifficulty), true);
    embed.addField("Mods", textFormat.boldString(playMods), true);
    embed.addField("Hits",
        "<:hit300sb:532754291199442964> " + count300s + " "
        + "<:hitgekisb:532764843648876554>" + countGeki + "\n"
        + "<:hit100sb:532754307897098240> " + count100s + " "
        + "<:hitkatusb:532764853270741002>" + countKatu + "\n"
        + "<:hit50sb:532754317808238615> " + count50s + " "
        + "<:hit0sb:532754325467037696> " + countmiss
        , true);
    embed.addField("Download", "[Link](https://osu.ppy.sh/d/" + bmpHDID + ")", true);
    embed.setFooter(footer);

    return embed;

}

exp.generateModsString = generateModsString;
exp.determinateRank = determinateRank;
exp.generateTimeFooter = generateTimeFooter;
exp.generatePlayEmbed = generatePlayEmbed;
