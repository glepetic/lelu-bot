const bot = require("../.././bot.js");
const math = require(".././math.js");
const osuMods = require("./mods.js");
const markdown = require("../discord/markdown.js");


function determinateRank(rank) {
    switch (rank) {
        case "A" :
            return "<:rankingAsmall:546508668200550400>";
        case "B" :
            return "<:rankingBsmall:546508724559151118>";
        case "C" :
            return "<:rankingCsmall:546508754628378645>";
        case "D" :
            return "<:rankingDsmall:546508819400753155>";
        case "F" :
            return "<:rankingFsmall:527660248127897610>";
        case "S" :
            return "<:rankingSsmall:546508424792375297>";
        case "X" :
            return "<:rankingXsmall:546508937088860171>";
        case "SH" :
            return "<:rankingSHsmall:546508869371953163>";
        case "XH" :
            return "<:rankingXHsmall:546508970517331969>";

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

    let pp = ppGain != null ? markdown.bold(ppGain) : "";

    let embed = new bot.discord.RichEmbed();
    embed.setTitle(markdown.underlineBold(bmpTitle + " [" + bmpVersion + "]"));
    embed.setURL(url);
    embed.setThumbnail("https://b.ppy.sh/thumb/" + bmpHDID + "l.jpg");
    embed.setColor(12663939);
    embed.addField("Rank & PP", playRank + pp, true);
    embed.addField("Accuracy", markdown.bold(playAccuracy), true);
    embed.addField("Score", markdown.bold(playScore), true);
    embed.addField("Player", userProfile, true);
    embed.addField("Difficulty", markdown.bold(playDifficulty), true);
    embed.addField("Mods", markdown.bold(playMods), true);
    embed.addField("Hits",
        "<:hit300sb:532754291199442964> " + count300s + " "
        + "<:hitgekisb:532764843648876554>" + countGeki + "\n"
        + "<:hit100sb:532754307897098240> " + count100s + " "
        + "<:hitkatusb:532764853270741002>" + countKatu + "\n"
        + "<:hit50sb:532754317808238615> " + count50s + " "
        + "<:hit0sb:532754325467037696> " + countmiss
        , true);
    embed.addField("Download", markdown.createLink("Link", "https://osu.ppy.sh/d/" + bmpHDID), true);
    embed.setFooter(footer);

    return embed;

}

function getCommands(){
    let register = markdown.bold("register:") + "\n!osu register [osu user]\n" + "Links your osu username to your discord user.\n\n";
    let recent = markdown.bold("recent:") + "\n!osu recent <username>\n" + "Displays the recent play by the player 'username'. Can avoid typing username if already registered.\n\n";
    let best = markdown.bold("best:") + "\n!osu best <username>\n" + "Displays the best play by the player 'username'. Can avoid typing username if already registered.\n\n";
    let wasted = markdown.bold("wasted:") + "\n!osu wasted <username>\n" + "Displays the time wasted playing osu! for the player 'username'. Can avoid typing username if already registered.\n\n";
    return register + recent + best + wasted;
}

exports.generateModsString = generateModsString;
exports.determinateRank = determinateRank;
exports.generatePlayEmbed = generatePlayEmbed;
exports.getCommands = getCommands;
